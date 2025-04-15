document.addEventListener('DOMContentLoaded', function() {
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    pageTransition.appendChild(loader);
    document.body.appendChild(pageTransition);
    
    const heroSection = document.querySelector('.hero');
    const heroParticles = document.createElement('div');
    heroParticles.className = 'hero-particles';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.width = `${Math.random() * 5 + 2}px`;
        particle.style.height = particle.style.width;
        heroParticles.appendChild(particle);
    }
    
    if (heroSection) {
        heroSection.insertBefore(heroParticles, heroSection.firstChild);
    }
    
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        const contactDecoration = document.createElement('div');
        contactDecoration.className = 'contact-decoration';
        
        for (let i = 0; i < 3; i++) {
            const circle = document.createElement('div');
            circle.className = 'circle';
            contactDecoration.appendChild(circle);
        }
        
        contactSection.appendChild(contactDecoration);
    }
    
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);
    
    const mouseFollow = document.createElement('div');
    mouseFollow.className = 'mouse-follow';
    document.body.appendChild(mouseFollow);
    
    document.addEventListener('mousemove', function(e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        
        mouseFollow.style.left = e.clientX + 'px';
        mouseFollow.style.top = e.clientY + 'px';
    });
    
    const buttons = document.querySelectorAll('button, a, .event-card, .logo');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            customCursor.classList.add('hover');
        });
        
        button.addEventListener('mouseleave', function() {
            customCursor.classList.remove('hover');
        });
    });
    
    const rippleButtons = document.querySelectorAll('.inscribirse, .enviar');
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    const scrollElements = document.querySelectorAll(
        '.mission-content, .mission-text, .mission-image, .event-card, .contact-info, .contact-form, .map-container'
    );
    
    function elementInView(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    function displayScrollElement(element) {
        element.classList.add('active');
    }
    
    function handleScrollAnimation() {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    }
    
    setTimeout(() => {
        pageTransition.classList.add('loaded');
        handleScrollAnimation();
    }, 1000);
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    const tiltElements = document.querySelectorAll('.logo, .event-card, .mission-image');
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 15;
            const angleX = (centerY - y) / 15;
            
            this.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateX(0) rotateY(0)';
        });
    });
    
    const titleSection = document.querySelector('.title-section');
    if (titleSection) {
        const subtitle = titleSection.querySelector('p');
        if (subtitle) {
            subtitle.classList.add('typing-text');
        }
    }
    
    const mapSection = document.querySelector('.map');
    if (mapSection) {
        const mapMarkers = document.createElement('div');
        mapMarkers.className = 'map-markers';
        
        for (let i = 0; i < 10; i++) {
            const marker = document.createElement('div');
            marker.className = 'map-marker';
            marker.style.left = `${Math.random() * 90 + 5}%`;
            marker.style.top = `${Math.random() * 90 + 5}%`;
            marker.style.animationDelay = `${Math.random() * 3}s`;
            mapMarkers.appendChild(marker);
        }
        
        mapSection.appendChild(mapMarkers);
    }
    
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const mensaje = formData.get('mensaje');
            
            const submitButton = this.querySelector('.enviar');
            submitButton.innerHTML = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = '¡Mensaje Enviado!';
                contactForm.reset();
                
                setTimeout(() => {
                    submitButton.innerHTML = 'Enviar Mensaje';
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        if (!nav) return;
        
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        document.querySelector('.header-main').appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    };
    
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.menu-toggle')) {
                createMobileMenu();
            }
        }
    });
    
    const animateFooter = () => {
        const footerColumns = document.querySelectorAll('.footer-column');
        
        footerColumns.forEach((column, index) => {
            column.style.opacity = '0';
            column.style.transform = 'translateY(20px)';
            column.style.transition = 'all 0.5s ease';
            column.style.transitionDelay = `${index * 0.2}s`;
        });
        
        const isFooterInView = () => {
            const footer = document.querySelector('footer');
            if (!footer) return false;
            
            const rect = footer.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
            );
        };
        
        const checkFooterAnimation = () => {
            if (isFooterInView()) {
                footerColumns.forEach(column => {
                    column.style.opacity = '1';
                    column.style.transform = 'translateY(0)';
                });
                window.removeEventListener('scroll', checkFooterAnimation);
            }
        };
        
        window.addEventListener('scroll', checkFooterAnimation);
        checkFooterAnimation(); 
    };
    
    animateFooter();
});