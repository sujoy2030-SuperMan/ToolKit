document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Before/After Slider Logic
    const slider = document.querySelector('.slider-handle');
    const imageAfter = document.querySelector('.image-after');
    const container = document.querySelector('.comparison-container');

    if (slider && container) {
        let isResizing = false;

        const moveSlider = (e) => {
            if (!isResizing) return;
            const rect = container.getBoundingClientRect();
            const x = (e.pageX || e.touches[0].pageX) - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            slider.style.left = `${percentage}%`;
            imageAfter.style.width = `${percentage}%`;
        };

        slider.addEventListener('mousedown', () => isResizing = true);
        window.addEventListener('mouseup', () => isResizing = false);
        window.addEventListener('mousemove', moveSlider);
        
        slider.addEventListener('touchstart', () => isResizing = true);
        window.addEventListener('touchend', () => isResizing = false);
        window.addEventListener('touchmove', moveSlider);
    }

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--nav-bg)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid var(--border-color)';
        });
    }
});

// Utility: Format Bytes
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
