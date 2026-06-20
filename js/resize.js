document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const workspace = document.getElementById('workspace');
    const widthInp = document.getElementById('widthInp');
    const heightInp = document.getElementById('heightInp');
    const lockAspect = document.getElementById('lockAspect');
    const downloadBtn = document.getElementById('downloadBtn');

    let currentFile = null;
    let originalRatio = 1;

    const handleFile = (file) => {
        currentFile = file;
        const img = new Image();
        img.onload = () => {
            originalRatio = img.width / img.height;
            widthInp.value = img.width;
            heightInp.value = img.height;
            document.getElementById('previewImg').src = img.src;
            workspace.style.display = 'block';
            uploadArea.style.display = 'none';
        };
        img.src = URL.createObjectURL(file);
    };

    widthInp.addEventListener('input', () => {
        if (lockAspect.checked) {
            heightInp.value = Math.round(widthInp.value / originalRatio);
        }
    });

    heightInp.addEventListener('input', () => {
        if (lockAspect.checked) {
            widthInp.value = Math.round(heightInp.value * originalRatio);
        }
    });

    downloadBtn.addEventListener('click', async () => {
        const result = await processImage(currentFile, {
            width: parseInt(widthInp.value),
            quality: 0.9,
            format: 'image/png'
        });
        const link = document.createElement('a');
        link.download = `resized-${currentFile.name}`;
        link.href = result.dataUrl;
        link.click();
    });

    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => e.target.files[0] && handleFile(e.target.files[0]));
});
