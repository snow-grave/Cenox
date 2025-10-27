document.addEventListener('DOMContentLoaded', function() {

    // --- 1. EFEITO PARALLAX COM O MOUSE ---
    const parallaxElements = document.querySelectorAll('.parallax-element');
    if (parallaxElements.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) - 0.5;
            const y = (clientY / window.innerHeight) - 0.5;

            parallaxElements.forEach(el => {
                const speed = el.dataset.speed;
                el.style.transform = `translateX(${-x * speed}px) translateY(${-y * speed}px)`;
            });
        });
    }

    // --- 2. ANIMAÇÃO FADE-IN AO ROLAR ---
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    if (fadeInElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeInElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- 3. SCROLL SUAVE (SMOOTH SCROLLING) ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                try {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 120;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                } catch (error) {
                    console.error("Invalid selector for smooth scroll:", targetId);
                }
            });
        });
    }

    // --- 4. CONTROLE DO POPUP DE LOGIN, CADASTRO E RECUPERAÇÃO ---
    const signUpButton = document.querySelector('.cta-buttons .btn-outline');
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopupButton = document.getElementById('close-popup-btn');

    const switchToSignupLink = document.getElementById('switch-to-signup');
    const switchToLoginLink = document.getElementById('switch-to-login');
    const switchToForgotLink = document.getElementById('switch-to-forgot');
    const switchBackToLoginLink = document.getElementById('switch-back-to-login');
    
    const loginView = document.getElementById('login-view');
    const signupView = document.getElementById('signup-view');
    const forgotPasswordView = document.getElementById('forgot-password-view');

    function openPopup() {
        if (popupOverlay) {
            loginView.classList.add('active');
            signupView.classList.remove('active');
            forgotPasswordView.classList.remove('active');
            
            popupOverlay.classList.add('active');
            document.body.classList.add('popup-active');
        }
    }

    function closePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.classList.remove('popup-active');
        }
    }

    if (signUpButton) {
        signUpButton.addEventListener('click', function(e) {
            e.preventDefault();
            openPopup();
        });
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', closePopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
    }

    if (switchToSignupLink) {
        switchToSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginView.classList.remove('active');
            signupView.classList.add('active');
        });
    }

    if (switchToLoginLink) {
        switchToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            signupView.classList.remove('active');
            loginView.classList.add('active');
        });
    }
    
    if (switchToForgotLink) {
        switchToForgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginView.classList.remove('active');
            forgotPasswordView.classList.add('active');
        });
    }

    if (switchBackToLoginLink) {
        switchBackToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            forgotPasswordView.classList.remove('active');
            loginView.classList.add('active');
        });
    }
    
    // --- 5. ATUALIZAÇÃO DA BARRA DE NAVEGAÇÃO AO ROLAR ---
    const sections = document.querySelectorAll('section[id]');
    
    const navObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const sectionId = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 6. EFEITO SPOTLIGHT NOS CARDS ---
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
    
});