// js/tools/pdf.js

// ১. পিডিএফ মার্জার
function initPdfMerge(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Select Multiple PDF Files</label><input type="file" id="f" class="form-control" accept="application/pdf" multiple></div>
        <button id="ex" class="btn-primary">Merge PDF Document Streams</button>
        <div id="status" style="margin-top:15px; font-weight:bold; text-align:center;"></div>
        <a id="dl" class="btn-primary" style="display:none; margin-top:15px; background:#10b981;">Download Unified PDF</a>
    `;
    ctx.querySelector('#ex').addEventListener('click', async () => {
        const files = ctx.querySelector('#f').files;
        if(files.length < 2) return alert('Minimum 2 individual PDF files required for consolidation.');
        const status = ctx.querySelector('#status');
        status.innerText = "Processing binary streams inside cache memory layers...";
        try {
            const mergedPdf = await PDFLib.PDFDocument.create();
            for(let f of files) {
                const ab = await f.arrayBuffer();
                const doc = await PDFLib.PDFDocument.load(ab);
                const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
                copiedPages.forEach((p) => mergedPdf.addPage(p));
            }
            const bytes = await mergedPdf.save();
            const blob = new Blob([bytes], {type: "application/pdf"});
            status.innerText = "Compilation complete!";
            const d = ctx.querySelector('#dl'); d.href = URL.createObjectURL(blob); d.download = "unified_master_document.pdf"; d.style.display='block';
        } catch(err) {
            status.innerText = "Processing failed: " + err.message;
        }
    });
}

// ২. পিডিএফ পেজ কাউন্টার
function initPdfCounter(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Upload Target Document File</label><input type="file" id="f" class="form-control" accept="application/pdf"></div>
        <button id="ex" class="btn-primary">Parse Object Catalog Nodes</button>
        <h3 id="res" style="margin-top:20px; text-align:center; color:var(--accent-primary);"></h3>
    `;
    ctx.querySelector('#ex').addEventListener('click', async () => {
        const file = ctx.querySelector('#f').files[0];
        if(!file) return alert('Select file target parameters.');
        try {
            const ab = await file.arrayBuffer();
            const doc = await PDFLib.PDFDocument.load(ab);
            ctx.querySelector('#res').innerText = `Total Page Elements Detected: ${doc.getPageCount()}`;
        } catch(err) {
            alert('File parsing system error: ' + err.message);
        }
    });
}
