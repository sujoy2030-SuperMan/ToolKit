
// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('toolsGridRenderer');
    const search = document.getElementById('globalSearch');
    const suggestions = document.getElementById('searchSuggestions');
    const catButtons = document.querySelectorAll('.cat-btn');
    const modal = document.getElementById('workspaceEngineModal');
    const closeBtn = document.getElementById('closeWorkspaceBtn');
    const themeBtn = document.getElementById('themeBtn');

    // Central Multi-Tool Schema Registry Data Matrix
    window.TOOLS_DATABASE = [
        { id: 'img-compress', title: 'Image Compressor', desc: 'Optimize structural file payloads cleanly inside client device cache memory frames.', cat: 'images', kw: ['compress', 'jpg', 'png', 'shrink', 'optimize'] },
        { id: 'img-resize', title: 'Image Resizer', desc: 'Alter active canvas boundaries based on explicit custom height/width limits.', cat: 'images', kw: ['resize', 'scale', 'dimensions', 'crop'] },
        { id: 'webp-jpg', title: 'WEBP to JPG Converter', desc: 'Decompress modern dynamic Google WebP image data layers directly back into JPEGs.', cat: 'images', kw: ['webp', 'jpg', 'converter', 'decode'] },
        { id: 'img-grayscale', title: 'Grayscale Shading Filter', desc: 'Wipe away structural chroma components leaving high fidelity pixel luma values.', cat: 'images', kw: ['grayscale', 'black and white', 'monochrome', 'filter'] },
        
        { id: 'pdf-merge', title: 'Merge PDF Documents', desc: 'Combine multiple binary document streams into single structural exports seamlessly.', cat: 'pdf', kw: ['pdf', 'merge', 'combine', 'join'] },
        { id: 'pdf-counter', title: 'PDF Page Counter', desc: 'Scan structural meta signatures to record true page instance bounds inside local memory.', cat: 'pdf', kw: ['pdf', 'pages', 'count', 'analyze'] },
        
        { id: 'dev-jsonformat', title: 'JSON Formatter & Lint', desc: 'Verify nested structural elements and string tokens to beautify syntax layouts.', cat: 'developers', kw: ['json', 'format', 'lint', 'beautify'] },
        { id: 'dev-base64', title: 'Base64 Serialization Codec', desc: 'Translate alphanumeric sequences cleanly matching standard RFC 4648 specs.', cat: 'developers', kw: ['base64', 'encode', 'decode', 'binary'] },
        { id: 'dev-url', title: 'URL Parameter Codec', desc: 'Safely map standard URI string values and variable sequences directly.', cat: 'developers', kw: ['url', 'uri', 'encode', 'decode'] },
        
        { id: 'txt-counter', title: 'Word & Character Counter', desc: 'Extract accurate total words and sequence character metrics in real-time.', cat: 'text', kw: ['word count', 'letters', 'length', 'analytics'] },
        { id: 'txt-spaces', title: 'Extra Space Stripper', desc: 'Clean out text blocks by removing redundant whitespace and tab intervals.', cat: 'text', kw: ['space', 'clean', 'trim', 'regex'] },
        
        { id: 'fin-emi', title: 'Loan EMI Calculator', desc: 'Compute monthly installments using the standard reducing-balance formula.', cat: 'financial', kw: ['emi', 'loan', 'interest', 'mortgage'] },
        { id: 'fin-gst', title: 'GST Calculation Engine', desc: 'Determine tax allocation components against multi-slab standard models.', cat: 'financial', kw: ['gst', 'tax', 'cgst', 'sgst'] },
        { id: 'fin-sip', title: 'SIP Mutual Fund Engine', desc: 'Project future values and dynamic growth against systematic investment horizons.', cat: 'financial', kw: ['sip', 'investment', 'wealth', 'compound'] },
        
        { id: 'utl-qr', title: 'Micro QR Grid Generator', desc: 'Turn plain text fields or link configurations into secure matrix codes.', cat: 'utilities', kw: ['qr code', 'matrix', 'barcode'] },
        { id: 'utl-uuid', title: 'Cryptographic UUID Engine', desc: 'Instantiate universally unique version-4 RFC 4122 compliance identifiers.', cat: 'utilities', kw: ['uuid', 'guid', 'token', 'random'] },
        
        { id: 'in-aadhaar', title: 'Aadhaar Privacy Masker', desc: 'Block out private numerical values on identity proof scans for security compliance.', cat: 'india', kw: ['aadhaar', 'masking', 'privacy', 'uidai', 'identity'] },
        { id: 'in-upi', title: 'Dynamic UPI QR Builder', desc: 'Compile explicit payee payment addresses into active instant scanning targets.', cat: 'india', kw: ['upi', 'qr', 'payment link', 'bhim'] }
    ];

    // Card Renderer Execution Engine
    function renderTools(filterCat = 'all', filterQuery = '') {
        grid.innerHTML = '';
        const query = filterQuery.toLowerCase().trim();
        
        const filtered = TOOLS_DATABASE.filter(tool => {
            const matchesCat = (filterCat === 'all' || tool.cat === filterCat);
            const matchesSearch = !query || 
                tool.title.toLowerCase().includes(query) || 
                tool.desc.toLowerCase().includes(query) || 
                tool.kw.some(k => k.toLowerCase().includes(query));
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">No production tools match your query criteria.</div>`;
            return;
        }

        filtered.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card glass-panel';
            card.innerHTML = `
                <div class="tool-icon">🛠️</div>
                <h3>${tool.title}</h3>
                <p>${tool.desc}</p>
                <span class="tool-tag">${tool.cat}</span>
            `;
            card.addEventListener('click', () => launchWorkspace(tool.id));
            grid.appendChild(card);
        });
    }

    // Live Instant Search Subsystem
    search.addEventListener('input', (e) => {
        const val = e.target.value;
        const currentCat = document.querySelector('.cat-btn.active').dataset.cat;
        renderTools(currentCat, val);
        
        if (val.length > 1) {
            const matches = TOOLS_DATABASE.filter(t => t.title.toLowerCase().includes(val.toLowerCase())).slice(0, 5);
            if (matches.length > 0) {
                suggestions.innerHTML = matches.map(m => `<div class="suggestion-item" data-id="${m.id}">${m.title}</div>`).join('');
                suggestions.style.display = 'block';
            } else {
                suggestions.style.display = 'none';
            }
        } else {
            suggestions.style.display = 'none';
        }
    });

    suggestions.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-item')) {
            launchWorkspace(e.target.dataset.id);
            suggestions.style.display = 'none';
            search.value = '';
        }
    });

    // Category Layout Event Bindings
    document.getElementById('categoriesNav').addEventListener('click', (e) => {
        if (e.target.classList.contains('cat-btn')) {
            catButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderTools(e.target.dataset.cat, search.value);
        }
    });

    // Theme Toggle Control Matrix
    themeBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', activeTheme === 'dark' ? 'light' : 'dark');
    });

    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    // Initial Trigger Run
    renderTools();
});

// Dynamic Workspace Routing Controller Layer
function launchWorkspace(toolId) {
    const modal = document.getElementById('workspaceEngineModal');
    const title = document.getElementById('wTitle');
    const desc = document.getElementById('wDesc');
    const container = document.getElementById('wWorkspaceContent');
    
    const tool = TOOLS_DATABASE.find(t => t.id === toolId);
    if (!tool) return;

    title.innerText = tool.title;
    desc.innerText = tool.desc + " [100% Client-Side In-Browser Pipeline Execution]";
    container.innerHTML = '';
    modal.style.display = 'flex';

    // Route target mappings straight into designated execution blocks
    const routingTable = {
        'img-compress': initImgCompressor, 'img-resize': initImgResizer, 'webp-jpg': initWebPToJPG, 'img-grayscale': initGrayscaleFilter,
        'pdf-merge': initPdfMerge, 'pdf-counter': initPdfCounter,
        'dev-jsonformat': initJsonFormatter, 'dev-base64': initBase64Codec, 'dev-url': initUrlCodec,
        'txt-counter': initWordCounter, 'txt-spaces': initSpaceStripper,
        'fin-emi': initEmiCalculator, 'fin-gst': initGstCalculator, 'fin-sip': initSipCalculator,
        'utl-qr': initQrGenerator, 'utl-uuid': initUuidGenerator,
        'in-aadhaar': initAadhaarMasker, 'in-upi': initUpiPaymentQr
    };

    if (routingTable[toolId]) {
        routingTable[toolId](container);
    } else {
        container.innerHTML = `<p style="color:var(--text-secondary); text-align:center; padding:20px;">Allocating runtime processing context structure standard...</p>`;
    }
}
