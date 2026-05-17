// KoalaSnap Landing Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .hero-buttons a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll animation for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(step);
    });

    // Add parallax effect to hero image
    const heroImage = document.querySelector('.mockup-browser');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;

                if (!target.classList.contains('animated')) {
                    target.classList.add('animated');

                    // Simple number animation
                    if (!isNaN(finalValue)) {
                        let current = 0;
                        const increment = finalValue / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= finalValue) {
                                target.textContent = finalValue;
                                clearInterval(timer);
                            } else {
                                target.textContent = Math.floor(current);
                            }
                        }, 30);
                    }
                }
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, observerOptions);
    stats.forEach(stat => statsObserver.observe(stat));

    // Add active state to navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Track download button clicks
    const downloadButtons = document.querySelectorAll('.btn-primary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Download button clicked:', button.textContent);
            // You can add analytics tracking here
        });
    });

    // Language toggle functionality
    window.toggleLanguage = function () {
        const currentLang = localStorage.getItem('koalasnap-lang') || 'zh';
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('koalasnap-lang', newLang);
        updateLanguage(newLang);
    };

    function updateLanguage(lang) {
        const zhElements = document.querySelectorAll('.lang-zh');
        const enElements = document.querySelectorAll('.lang-en');

        if (lang === 'en') {
            zhElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => el.style.display = '');
            document.documentElement.lang = 'en';
        } else {
            zhElements.forEach(el => el.style.display = '');
            enElements.forEach(el => el.style.display = 'none');
            document.documentElement.lang = 'zh-CN';
        }
    }

    // Initialize language on page load
    const savedLang = localStorage.getItem('koalasnap-lang') || 'zh';
    updateLanguage(savedLang);
});
