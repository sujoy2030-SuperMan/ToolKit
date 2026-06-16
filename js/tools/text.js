// js/tools/text.js

// ১. ওয়ার্ড এবং ক্যারেক্টার কাউন্টার
function initWordCounter(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Target Input Character String Buffer</label><textarea id="i" class="form-control" style="height:140px;"></textarea></div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div class="glass-panel" style="padding:15px; text-align:center;">Words: <strong id="w">0</strong></div>
            <div class="glass-panel" style="padding:15px; text-align:center;">Characters: <strong id="c">0</strong></div>
        </div>
    `;
    const i = ctx.querySelector('#i'), w = ctx.querySelector('#w'), c = ctx.querySelector('#c');
    i.addEventListener('input', () => {
        const txt = i.value.trim();
        w.innerText = txt === "" ? 0 : txt.split(/\s+/).length;
        c.innerText = i.value.length;
    });
}

// ২. স্পেস ক্লিনার
function initSpaceStripper(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Unsanitized Text Area Source</label><textarea id="i" class="form-control" style="height:100px;"></textarea></div>
        <button id="ex" class="btn-primary">Strip Extra Space Sequences</button>
        <div class="form-group" style="margin-top:15px;"><label>Sanitized Output Stream Result</label><textarea id="o" class="form-control" style="height:100px;" readonly></textarea></div>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        const raw = ctx.querySelector('#i').value;
        ctx.querySelector('#o').value = raw.replace(/[ \t]+/g, ' ').replace(/^ +| +$/mg, '');
    });
}
