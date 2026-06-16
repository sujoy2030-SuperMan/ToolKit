// js/tools/developers.js

// ১. জেসন ফরম্যাটার এবং লিন্টার
function initJsonFormatter(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Input Raw JSON Payload</label><textarea id="i" class="form-control" style="height:120px; font-family:monospace;"></textarea></div>
        <div style="display:flex; gap:10px; margin-bottom:15px;"><button id="b" class="btn-primary">Beautify Format</button><button id="m" class="btn-primary" style="background:#64748b;">Minify Compress</button></div>
        <div class="form-group"><label>Terminal Result Tree View</label><textarea id="o" class="form-control" style="height:150px; font-family:monospace; background:rgba(0,0,0,0.02);" readonly></textarea></div>
    `;
    const i = ctx.querySelector('#i'), o = ctx.querySelector('#o');
    ctx.querySelector('#b').addEventListener('click', () => {
        try{ o.value = JSON.stringify(JSON.parse(i.value), null, 4); } catch(e){ o.value="Invalid Format Signature Syntax: " + e.message; }
    });
    ctx.querySelector('#m').addEventListener('click', () => {
        try{ o.value = JSON.stringify(JSON.parse(i.value)); } catch(e){ o.value="Invalid Format Signature Syntax: " + e.message; }
    });
}

// ২. বেস৬৪ কোডেক
function initBase64Codec(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Input Data Block String</label><textarea id="i" class="form-control" style="height:90px;"></textarea></div>
        <div style="display:flex; gap:10px; margin-bottom:15px;"><button id="e" class="btn-primary">RFC4648 Encode</button><button id="d" class="btn-primary" style="background:#64748b;">RFC4648 Decode</button></div>
        <div class="form-group"><label>Transformation Viewport</label><textarea id="o" class="form-control" style="height:90px;" readonly></textarea></div>
    `;
    const i = ctx.querySelector('#i'), o = ctx.querySelector('#o');
    ctx.querySelector('#e').addEventListener('click', () => o.value = btoa(unescape(encodeURIComponent(i.value))));
    ctx.querySelector('#d').addEventListener('click', () => {
        try{ o.value = decodeURIComponent(escape(atob(i.value))); }catch(e){ o.value="Base64 Binary Matrix Corruption Detected."; }
    });
}

// ৩. ইউআরএল কোডেক
function initUrlCodec(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Target URL Content Component String</label><textarea id="i" class="form-control" style="height:90px;"></textarea></div>
        <div style="display:flex; gap:10px; margin-bottom:15px;"><button id="e" class="btn-primary">Percent Encode</button><button id="d" class="btn-primary" style="background:#64748b;">Decode URI</button></div>
        <div class="form-group"><label>Result Buffer Block</label><textarea id="o" class="form-control" style="height:90px;" readonly></textarea></div>
    `;
    const i = ctx.querySelector('#i'), o = ctx.querySelector('#o');
    ctx.querySelector('#e').addEventListener('click', () => o.value = encodeURIComponent(i.value));
    ctx.querySelector('#d').addEventListener('click', () => { try{o.value = decodeURIComponent(i.value);}catch(e){o.value="Malformed Input Variable Vector Block.";} });
}
