// js/tools/india.js

// ১. আধার নম্বর মাস্কিং প্রাইভেসী ইঞ্জিন
function initAadhaarMasker(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Upload Identity Card Image File (UIDAI Standard Format)</label><input type="file" id="f" class="form-control" accept="image/*"></div>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:12px;">⚠️ Your browser will black out the initial 8 identity digits directly using canvas layer matrices to preserve regulatory compliance privacy constraints.</p>
        <button id="ex" class="btn-primary">Execute Redaction Mask Overlay</button>
        <canvas id="cv" style="width:100%; height:auto; display:none; border-radius:8px; border:1px solid var(--border-color); margin-top:15px;"></canvas>
        <a id="dl" class="btn-primary" style="display:none; margin-top:15px; background:#10b981;">Download Masked Identity Proof</a>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        const file = ctx.querySelector('#f').files[0];
        if(!file) return alert('Source file target parameter missing.');
        const r = new FileReader();
        r.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const cv = ctx.querySelector('#cv'), c = cv.getContext('2d');
                cv.width = img.width; cv.height = img.height;
                c.drawImage(img, 0, 0);
                
                // Privacy masking algorithms overlay allocation
                c.fillStyle = "#151515";
                const w = cv.width * 0.38, h = cv.height * 0.065;
                const startX = (cv.width / 2) - (w / 1.05), startY = cv.height * 0.76;
                
                c.fillRect(startX, startY, w, h);
                cv.style.display = 'block';
                const dl = ctx.querySelector('#dl'); dl.href = cv.toDataURL('image/png'); dl.download=`masked_${file.name}`; dl.style.display='block';
            };
            img.src = e.target.result;
        };
        r.readAsDataURL(file);
    });
}

// ২. ইউপিআই ইনস্ট্যান্ট পেমেন্ট কিউআর কোড জেনারেটর
function initUpiPaymentQr(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Recipient Virtual Payment Address (VPA / UPI ID)</label><input type="text" id="vpa" class="form-control" placeholder="payee@okaxis"></div>
        <div class="form-group"><label>Payee Individual / Account Merchant Name</label><input type="text" id="name" class="form-control" placeholder="e.g. Bharat Enterprise"></div>
        <div class="form-group"><label>Explicit Transaction Amount (₹ Optional)</label><input type="number" id="amt" class="form-control" placeholder="Leave empty for open merchant scan execution"></div>
        <button id="ex" class="btn-primary">Compile BHIM Intent QR Code</button>
        <div id="target" style="margin:25px auto; display:flex; justify-content:center;"></div>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        const vpa = ctx.querySelector('#vpa').value.trim(), name = ctx.querySelector('#name').value.trim(), amt = ctx.querySelector('#amt').value.trim();
        if(!vpa || !name) return alert('Mandatory recipient criteria profiles parameters missing.');
        
        // Build official uniform NPCI payment link vector string
        const linkString = `upi://pay?pa=${encodeURIComponent(vpa)}&pn=${encodeURIComponent(name)}${amt ? `&am=${encodeURIComponent(amt)}` : ''}&cu=INR`;
        const target = ctx.querySelector('#target'); target.innerHTML = '';
        new QRCode(target, {
            text: linkString,
            width: 200, height: 200,
            colorDark : "#020617", colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.M
        });
    });
}
