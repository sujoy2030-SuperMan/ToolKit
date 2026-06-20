document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const workspace = document.getElementById('workspace');
    const formatSelect = document.getElementById('formatSelect');
    const downloadBtn = document.getElementById('downloadBtn');
    const previewImg = document.getElementById('previewImg');

    let currentFile = null;

    const handleFile = (file) => {
        currentFile = file;
        previewImg.src = URL.createObjectURL(file);
        workspace.style.display = 'block';
        uploadArea.style.display = 'none';
    };

    downloadBtn.addEventListener('click', () => {
        if (!currentFile) return;
        
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const format = formatSelect.value;
            const mimeType = `image/${format}`;
            const dataUrl = canvas.toDataURL(mimeType, 0.9);
            
            const link = document.createElement('a');
            link.download = `converted-image.${format}`;
            link.href = dataUrl;
            link.click();
        };
        img.src = previewImg.src;
    });

    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => e.target.files[0] && handleFile(e.target.files[0]));
});
