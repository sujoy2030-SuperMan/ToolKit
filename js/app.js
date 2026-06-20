document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Engine
    const initTheme = () => {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        const applyTheme = (theme) => {
            body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            if (themeToggle) {
                themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            }
        };

        const savedTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        applyTheme(savedTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = body.getAttribute('data-theme');
                applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
            });
        }
    };

    // 2. Before/After Slider Engine
    const initSlider = () => {
        const container = document.querySelector('.comparison-container');
        const handle = document.querySelector('.slider-handle');
        const afterImg = document.querySelector('.image-after');

        if (container && handle && afterImg) {
            let active = false;

            const move = (e) => {
                if (!active) return;
                let x = (e.pageX || e.touches[0].pageX) - container.getBoundingClientRect().left;
                let width = container.offsetWidth;
                let percent = (x / width) * 100;
                percent = Math.max(0, Math.min(100, percent));
                
                handle.style.left = `${percent}%`;
                afterImg.style.width = `${percent}%`;
            };

            handle.addEventListener('mousedown', () => active = true);
            window.addEventListener('mouseup', () => active = false);
            window.addEventListener('mousemove', move);
            
            handle.addEventListener('touchstart', () => active = true);
            window.addEventListener('touchend', () => active = false);
            window.addEventListener('touchmove', move);
        }
    };

    // 3. Scroll Animations (Linear Style)
    const initScrollAnims = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    };

    // 4. FAQ Engine
    const initFAQ = () => {
        const questions = document.querySelectorAll('.faq-question');
        questions.forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    };

    initTheme();
    initSlider();
    initScrollAnims();
    initFAQ();
});

// High Performance Image Processing Utils
const processImage = async (file, options = {}) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                let width = img.width;
                let height = img.height;

                if (options.width) {
                    width = options.width;
                    height = (img.height / img.width) * width;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                const quality = options.quality || 0.8;
                const format = options.format || 'image/jpeg';
                
                const dataUrl = canvas.toDataURL(format, quality);
                resolve({
                    dataUrl,
                    width,
                    height,
                    originalSize: file.size,
                    newSize: Math.round((dataUrl.length - 22) * 3 / 4)
                });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};
