document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const workspace = document.getElementById('workspace');
    const qualitySlider = document.getElementById('quality');
    const qualityVal = document.getElementById('qualityVal');
    const downloadBtn = document.getElementById('downloadBtn');

    let currentFile = null;

    const updateWorkspace = async () => {
        if (!currentFile) return;
        
        const result = await processImage(currentFile, {
            quality: qualitySlider.value / 100,
            format: 'image/jpeg'
        });

        document.getElementById('originalPreview').src = URL.createObjectURL(currentFile);
        document.getElementById('optimizedPreview').src = result.dataUrl;
        document.getElementById('origSizeLabel').textContent = formatBytes(result.originalSize);
        document.getElementById('optSizeLabel').textContent = formatBytes(result.newSize);
        
        const saved = ((result.originalSize - result.newSize) / result.originalSize * 100).toFixed(0);
        document.getElementById('savingsLabel').textContent = `Saved ${saved}%`;

        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.download = `optimized-${currentFile.name}`;
            link.href = result.dataUrl;
            link.click();
        };
    };

    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            currentFile = e.target.files[0];
            workspace.style.display = 'block';
            uploadArea.style.display = 'none';
            updateWorkspace();
        }
    });

    qualitySlider.addEventListener('input', (e) => {
        qualityVal.textContent = `${e.target.value}%`;
        updateWorkspace();
    });

    // Drag and Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(name => {
        uploadArea.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    uploadArea.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            currentFile = file;
            workspace.style.display = 'block';
            uploadArea.style.display = 'none';
            updateWorkspace();
        }
    });
});

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
