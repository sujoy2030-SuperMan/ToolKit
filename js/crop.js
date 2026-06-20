document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const workspace = document.getElementById('workspace');
    const cropCanvas = document.getElementById('cropCanvas');
    const downloadBtn = document.getElementById('downloadBtn');
    const ctx = cropCanvas.getContext('2d');

    let img = new Image();
    let cropBox = { x: 50, y: 50, width: 200, height: 200 };
    let isDragging = false;
    let dragType = null; // 'move' or 'resize'

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            img.onload = () => {
                // Resize canvas to fit image while maintaining aspect ratio
                const maxDim = 600;
                let scale = 1;
                if (img.width > maxDim || img.height > maxDim) {
                    scale = Math.min(maxDim / img.width, maxDim / img.height);
                }
                cropCanvas.width = img.width * scale;
                cropCanvas.height = img.height * scale;
                
                // Initialize crop box
                cropBox = {
                    x: cropCanvas.width * 0.1,
                    y: cropCanvas.height * 0.1,
                    width: cropCanvas.width * 0.8,
                    height: cropCanvas.height * 0.8
                };
                
                draw();
                workspace.style.display = 'block';
                uploadArea.style.display = 'none';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const draw = () => {
        ctx.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
        ctx.drawImage(img, 0, 0, cropCanvas.width, cropCanvas.height);

        // Overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, cropCanvas.width, cropCanvas.height);

        // Clear crop area
        ctx.clearRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
        ctx.drawImage(img, 
            (cropBox.x / cropCanvas.width) * img.width, 
            (cropBox.y / cropCanvas.height) * img.height, 
            (cropBox.width / cropCanvas.width) * img.width, 
            (cropBox.height / cropCanvas.height) * img.height,
            cropBox.x, cropBox.y, cropBox.width, cropBox.height
        );

        // Border
        ctx.strokeStyle = '#0066cc';
        ctx.lineWidth = 2;
        ctx.strokeRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);

        // Resize Handle
        ctx.fillStyle = '#0066cc';
        ctx.fillRect(cropBox.x + cropBox.width - 10, cropBox.y + cropBox.height - 10, 10, 10);
    };

    cropCanvas.addEventListener('mousedown', (e) => {
        const rect = cropCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check for resize handle
        if (x > cropBox.x + cropBox.width - 20 && x < cropBox.x + cropBox.width &&
            y > cropBox.y + cropBox.height - 20 && y < cropBox.y + cropBox.height) {
            isDragging = true;
            dragType = 'resize';
        } else if (x > cropBox.x && x < cropBox.x + cropBox.width &&
                   y > cropBox.y && y < cropBox.y + cropBox.height) {
            isDragging = true;
            dragType = 'move';
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const rect = cropCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (dragType === 'resize') {
            cropBox.width = Math.max(50, x - cropBox.x);
            cropBox.height = Math.max(50, y - cropBox.y);
        } else if (dragType === 'move') {
            cropBox.x = Math.max(0, Math.min(x - cropBox.width / 2, cropCanvas.width - cropBox.width));
            cropBox.y = Math.max(0, Math.min(y - cropBox.height / 2, cropCanvas.height - cropBox.height));
        }
        draw();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        dragType = null;
    });

    downloadBtn.addEventListener('click', () => {
        const resultCanvas = document.createElement('canvas');
        const rCtx = resultCanvas.getContext('2d');
        
        const actualX = (cropBox.x / cropCanvas.width) * img.width;
        const actualY = (cropBox.y / cropCanvas.height) * img.height;
        const actualW = (cropBox.width / cropCanvas.width) * img.width;
        const actualH = (cropBox.height / cropCanvas.height) * img.height;

        resultCanvas.width = actualW;
        resultCanvas.height = actualH;
        rCtx.drawImage(img, actualX, actualY, actualW, actualH, 0, 0, actualW, actualH);

        const link = document.createElement('a');
        link.download = 'cropped-image.png';
        link.href = resultCanvas.toDataURL('image/png');
        link.click();
    });

    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => e.target.files[0] && handleFile(e.target.files[0]));
});
