// js/tools/images.js

// ১. ইমেজ কম্প্রেশন ইঞ্জিন
function initImgCompressor(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Select Source Image</label><input type="file" id="f" class="form-control" accept="image/jpeg,image/png"></div>
        <div class="form-group"><label>Compression Factor Limit: <span id="qv">80</span>%</label><input type="range" id="q" min="10" max="100" value="80" style="width:100%"></div>
        <button id="ex" class="btn-primary">Execute Compactor Compressor</button>
        <img id="p" class="preview-box" />
        <a id="dl" class="btn-primary" style="display:none; margin-top:15px; background:#10b981;">Download Compressed File</a>
    `;
    const q = ctx.querySelector('#q'), qv = ctx.querySelector('#qv');
    q.addEventListener('input', () => qv.innerText = q.value);
    
    ctx.querySelector('#ex').addEventListener('click', () => {
        const file = ctx.querySelector('#f').files[0];
        if(!file) return alert('Input target parameter is empty.');
        const r = new FileReader();
        r.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const cv = document.createElement('canvas');
                cv.width = img.width; cv.height = img.height;
                cv.getContext('2d').drawImage(img, 0, 0);
                const data = cv.toDataURL('image/jpeg', q.value/100);
                ctx.querySelector('#p').src = data; ctx.querySelector('#p').style.display='block';
                const d = ctx.querySelector('#dl'); d.href = data; d.download=`compressed_${file.name.split('.')[0]}.jpg`; d.style.display='block';
            };
            img.src = e.target.result;
        };
        r.readAsDataURL(file);
    });
}

// ২. ইমেজ রিসাইজার ইঞ্জিন
function initImgResizer(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Choose Source Image Asset</label><input type="file" id="f" class="form-control" accept="image/*"></div>
        <div class="form-group"><label>Target Dimension Width (px)</label><input type="number" id="w" class="form-control" value="800"></div>
        <div class="form-group"><label>Target Dimension Height (px)</label><input type="number" id="h" class="form-control" value="600"></div>
        <button id="ex" class="btn-primary">Apply Dimensional Scaling</button>
        <img id="p" class="preview-box" />
        <a id="dl" class="btn-primary" style="display:none; margin-top:15px; background:#10b981;">Download Resized Output</a>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        const file = ctx.querySelector('#f').files[0], w = ctx.querySelector('#w').value, h = ctx.querySelector('#h').value;
        if(!file) return alert('Select file target parameters.');
        const r = new FileReader();
        r.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const cv = document.createElement('canvas');
                cv.width = w; cv.height = h;
                cv.getContext('2d').drawImage(img, 0, 0, w, h);
                const data = cv.toDataURL('image/png');
                ctx.querySelector('#p').src = data; ctx.querySelector('#p').style.display='block';
                const d = ctx.querySelector('#dl'); d.href = data; d.download=`resized_${file.name}`; d.style.display='block';
            };
            img.src = e.target.result;
        };
        r.readAsDataURL(file);
    });
}

// ৩. ওয়েবপি টু জেপিজি কনভার্টার
function initWebPToJPG(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Upload Dynamic WEBP Target</label><input type="file" id="f" class="form-control" accept="image/webp"></div>
        <button id="ex" class="btn-primary">Convert WEBP Sequence Stream</button>
        <img id="p" class="preview-box" />
        <a id="dl" class="btn-primary" style="display:none; margin-top:15px; background:#10b981;">Download Standard Jpeg</a>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        const file = ctx.querySelector('#f').files[0];
        if(!file) return alert('Target metadata parameters missing.');
        const r = new FileReader();
        r.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const cv = document.createElement('canvas');
                cv.width = img.width; cv.height = img.height;
                cv.getContext('2d').drawImage(img, 0, 0);
                const data = cv.toDataURL('image/jpeg', 0.9);
                ctx.querySelector('#p').src = data; ctx.querySelector('#p').style.display='block';
                const d = ctx.querySelector('#dl'); d.href = data; d.download=`converted_${file.name.split('.')[0]}.jpg`; d.style.display='block';
            };
            img.src = e.target.result;
        };
        r.readAsDataURL(file);
    });
}

// ৪. গ্রে-স্কেল ফিল্টার
function initGrayscaleFilter(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Choose Target Asset</label><input type="file" id="f" class="form-control" accept="image/*"></div>
        <button id="ex" class="btn-primary">Apply Chroma Stripping</button>
        <img id="p" class="preview-box" />
        <a id="dl" class="btn-primary" style="display:none; margin-top:15px; background:#10b981;">Download Grayscale Image</a>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        const file = ctx.querySelector('#f').files[0];
        if(!file) return alert('Select processing objective file target.');
        const r = new FileReader();
        r.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const cv = document.createElement('canvas'); const c = cv.getContext('2d');
                cv.width = img.width; cv.height = img.height;
                c.drawImage(img, 0, 0);
                const idata = c.getImageData(0,0, cv.width, cv.height), d = idata.data;
                for(let i=0; i<d.length; i+=4) {
                    let g = 0.2126*d[i] + 0.7152*d[i+1] + 0.0722*d[i+2];
                    d[i] = d[i+1] = d[i+2] = g;
                }
                c.putImageData(idata, 0,0);
                const data = cv.toDataURL('image/png');
                ctx.querySelector('#p').src = data; ctx.querySelector('#p').style.display='block';
                const dl = ctx.querySelector('#dl'); dl.href = data; dl.download=`grayscale_${file.name}`; dl.style.display='block';
            };
            img.src = e.target.result;
        };
        r.readAsDataURL(file);
    });
}
