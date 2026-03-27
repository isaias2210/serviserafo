// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('show');
    });

    // FAQ Acordeón
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los otros items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Abrir/cerrar el item actual
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Contador animado para estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Constantes para la animación
    const ANIMATION_DURATION_MS = 2000;
    const FRAME_INTERVAL_MS = 16; // ~60fps

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const step = target / (ANIMATION_DURATION_MS / FRAME_INTERVAL_MS);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Observador de intersección para activar animaciones cuando sea visible
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Scroll suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Cerrar menú móvil si está abierto
                navList.classList.remove('show');
            }
        });
    });
});
