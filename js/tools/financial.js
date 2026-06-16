// js/tools/financial.js

// ১. ইএমআই ক্যালকুলেটর
function initEmiCalculator(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Principal Principal Borrowed (₹)</label><input type="number" id="p" class="form-control" value="100000"></div>
        <div class="form-group"><label>Annual Yield Percentage Rate (%)</label><input type="number" id="r" class="form-control" value="8.5" step="0.01"></div>
        <div class="form-group"><label>Tenure Period Duration Allocation (Months)</label><input type="number" id="n" class="form-control" value="12"></div>
        <button id="ex" class="btn-primary">Compute Reducing Loan EMI</button>
        <div id="res" class="glass-panel" style="display:none; padding:15px; margin-top:15px;"></div>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        const P = parseFloat(ctx.querySelector('#p').value), N = parseInt(ctx.querySelector('#n').value);
        const R = parseFloat(ctx.querySelector('#r').value) / 12 / 100;
        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const grossPay = emi * N, netInt = grossPay - P;
        const out = ctx.querySelector('#res');
        out.innerHTML = `
            <p>Monthly Target Installment (EMI): <strong>₹${emi.toFixed(2)}</strong></p>
            <p>Accumulative Net Interest Charges: <strong>₹${netInt.toFixed(2)}</strong></p>
            <h4 style="color:var(--accent-primary); margin-top:5px;">Gross Repayment Capital: ₹${grossPay.toFixed(2)}</h4>
        `;
        out.style.display = 'block';
    });
}

// ২. জিএসটি ক্যালকুলেটর
function initGstCalculator(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Transaction Base Capital Value (INR)</label><input type="number" id="amt" class="form-control" value="5000"></div>
        <div class="form-group"><label>Tax Percentage Tier Standard Slab</label>
            <select id="slab" class="form-control">
                <option value="5">5% Standard</option><option value="12">12% Utility</option><option value="18" selected>18% Standard SaaS</option><option value="28">28% Premium Ceiling</option>
            </select>
        </div>
        <div style="display:flex; gap:10px; margin-bottom:15px;"><button id="inc" class="btn-primary">Inclusive Tax</button><button id="exc" class="btn-primary" style="background:#64748b;">Exclusive Tax</button></div>
        <div id="res" class="glass-panel" style="display:none; padding:15px;"></div>
    `;
    const a = ctx.querySelector('#amt'), s = ctx.querySelector('#slab'), r = ctx.querySelector('#res');
    const render = (net, tax, gross) => {
        r.innerHTML = `<p>Net Base Value: ₹${net.toFixed(2)}</p><p>CGST (50% Fraction): ₹${(tax/2).toFixed(2)}</p><p>SGST (50% Fraction): ₹${(tax/2).toFixed(2)}</p><h4 style="margin-top:5px; color:var(--accent-primary);">Gross Invoice Bill: ₹${gross.toFixed(2)}</h4>`;
        r.style.display = 'block';
    };
    ctx.querySelector('#inc').addEventListener('click', () => {
        const g = parseFloat(a.value), rate = parseFloat(s.value), n = g / (1 + (rate/100));
        render(n, g - n, g);
    });
    ctx.querySelector('#exc').addEventListener('click', () => {
        const n = parseFloat(a.value), rate = parseFloat(s.value), t = n * (rate/100);
        render(n, t, n + t);
    });
}

// ৩. এসআইপি ক্যালকুলেটর
function initSipCalculator(ctx) {
    ctx.innerHTML = `
        <div class="form-group"><label>Monthly Systematic Installment Allocation (₹)</label><input type="number" id="m" class="form-control" value="2000"></div>
        <div class="form-group"><label>Expected Expected Return Target Rate (%)</label><input type="number" id="i" class="form-control" value="12" step="0.1"></div>
        <div class="form-group"><label>Horizon Horizon Duration (Years)</label><input type="number" id="y" class="form-control" value="3"></div>
        <button id="ex" class="btn-primary">Compute Growth Projections</button>
        <div id="res" class="glass-panel" style="display:none; padding:15px; margin-top:15px;"></div>
    `;
    ctx.querySelector('#ex').addEventListener('click', () => {
        const M = parseFloat(ctx.querySelector('#m').value), Y = parseFloat(ctx.querySelector('#y').value);
        const interestRate = (parseFloat(ctx.querySelector('#i').value) / 100) / 12, totalMonths = Y * 12;
        const maturity = M * ((Math.pow(1 + interestRate, totalMonths) - 1) / interestRate) * (1 + interestRate);
        const invested = M * totalMonths;
        const out = ctx.querySelector('#res');
        out.innerHTML = `
            <p>Total Capital Invested: <strong>₹${invested.toFixed(2)}</strong></p>
            <p>Net Wealth Profit Yield: <strong>₹${(maturity - invested).toFixed(2)}</strong></p>
            <h3 style="color:#10b981; margin-top:8px;">Future Asset Valuation: ₹${maturity.toFixed(2)}</h3>
        `;
        out.style.display = 'block';
    });
}
