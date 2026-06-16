// js/seo.js
(function injectAdaptiveSchemaLayout() {
    const masterWebSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "@id": "https://omnitool.pro/#webapp",
                "url": "https://omnitool.pro/",
                "name": "OmniTool Pro",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "All modern OS platforms with standard browser runtime support",
                "browserRequirements": "Requires HTML5 Canvas, File API, and WebCrypto Layers",
                "description": "Premium client-side multi-tool platform offering zero signup free secure utilities.",
                "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [{
                    "@type": "Question",
                    "name": "Is my data completely secure on OmniTool Pro?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, absolutely. All processing, optimization, conversion, and analytic modifications execute locally within your device browser memory. No payload elements are ever submitted to processing servers."
                    }
                }]
            }
        ]
    };

    const element = document.createElement('script');
    element.type = 'application/ld+json';
    element.text = JSON.stringify(masterWebSchema);
    document.head.appendChild(element);
})();
