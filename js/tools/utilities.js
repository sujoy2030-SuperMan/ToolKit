// js/tools/utilities.js

// ১. কিউআর কোড জেনারেটর
function initQrGenerator(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Input Uniform Text String Data / URL Target</label><input type="text" id="data" class="form-control" value="https://omnitool.pro"></div>
        <button id="ex" class="btn-primary">Instantiate QR Matrix</button>
        <div id="target" style="margin:20px auto; display:flex; justify-content:center;"></div>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        const target = ctx.querySelector('#target');
        target.innerHTML = '';
        new QRCode(target, {
            text: ctx.querySelector('#data').value,
            width: 180, height: 180,
            colorDark : "#0f172a", colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    });
}

// ২. ক্রিপ্টোগ্রাফিক ইউইউআইডি জেনারেটর
function initUuidGenerator(ctx) {
    ctx.innerHTML = `
        <button id="ex" class="btn-primary">Generate High Entropy V4 UUID Vector</button>
        <div class="form-group" style="margin-top:20px;"><label>RFC4122 Standard Compliant String</label><input type="text" id="res" class="form-control" readonly style="font-family:monospace; text-align:center; font-weight:bold; color:var(--accent-primary);"></div>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        ctx.querySelector('#res').value = ([1x1e7]+-1x1e3+-4x1e3+-8x1e3+-1x1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    });
}
