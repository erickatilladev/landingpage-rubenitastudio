document.addEventListener('DOMContentLoaded', function() {
    // ========== Variáveis Globais ==========
    const body = document.body;
    const header = document.querySelector('.header');
    const menuMobileBtn = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');
    const navLinks = document.querySelectorAll('.menu a');
    const contactForm = document.getElementById('form-contato');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    body.appendChild(scrollToTopBtn);

    // ========== Menu Mobile ==========
    menuMobileBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        this.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuMobileBtn.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });
// ========== Navegação Suave ==========
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Se for um link para outra página (.html) ou externo, permite o comportamento padrão
        if (targetId.endsWith('.html') || targetId.startsWith('http')) {
            return;
        }
        
        // Se for âncora (#), faz scroll suave
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualiza a URL sem recarregar a página
                history.pushState(null, null, targetId);
            }
        }
        
        // Fecha o menu mobile se estiver aberto
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuMobileBtn.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
});

    // ========== Header Scroll Effect ==========
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Esconder/mostrar header no scroll
        if (currentScroll > 100) {
            header.classList.add('scrolled');
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mostrar botão de scroll to top
        if (currentScroll > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
        
        lastScroll = currentScroll;
    });

    // ========== Scroll to Top Button ==========
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== Testimonial Slider ==========
    if (testimonialSlider) {
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const testimonialCount = testimonials.length;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        // Inicializar slider
        showTestimonial(0);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCount;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // ========== Form Validation ==========
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            const servico = document.getElementById('servico');
            const mensagem = document.getElementById('mensagem');
            
            let isValid = true;
            
            // Resetar erros
            document.querySelectorAll('.error').forEach(el => el.remove());
            
            // Validar nome
            if (nome.value.trim() === '') {
                showError(nome, 'Por favor, insira seu nome');
                isValid = false;
            }
            
            // Validar email
            if (email.value.trim() === '') {
                showError(email, 'Por favor, insira seu e-mail');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Por favor, insira um e-mail válido');
                isValid = false;
            }
            
            // Validar telefone
            if (telefone.value.trim() === '') {
                showError(telefone, 'Por favor, insira seu telefone');
                isValid = false;
            }
            
            // Validar serviço
            if (servico.value === '') {
                showError(servico, 'Por favor, selecione um serviço');
                isValid = false;
            }
            
            // Se tudo estiver válido, enviar formulário
            if (isValid) {
                // Simular envio (substituir por AJAX na implementação real)
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                setTimeout(() => {
                    // Aqui normalmente seria uma chamada AJAX
                    showSuccessMessage();
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        function showError(input, message) {
            const errorElement = document.createElement('small');
            errorElement.className = 'error';
            errorElement.style.color = 'red';
            errorElement.style.display = 'block';
            errorElement.style.marginTop = '5px';
            errorElement.textContent = message;
            
            input.parentNode.appendChild(errorElement);
            input.focus();
        }
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function showSuccessMessage() {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.backgroundColor = 'var(--accent-color)';
            successMessage.style.color = 'white';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = 'var(--border-radius)';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            
            contactForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 3000);
        }
    }

    // ========== Animação ao Scroll ==========
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .about-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar

    // ========== WhatsApp Button ==========
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // Aqui você pode adicionar tracking (Google Analytics, Facebook Pixel, etc.)
            console.log('WhatsApp button clicked');
        });
    }
});

// ========== CSS para elementos JS ==========
const style = document.createElement('style');
style.textContent = `
    .no-scroll {
        overflow: hidden;
    }
    
    .menu.active {
        right: 0;
    }
    
    .menu-mobile.active i::before {
        content: '\\f00d';
    }
    
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--accent-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        background-color: var(--secondary-color);
        transform: translateY(-5px);
    }
    
    /* Animações */
    .service-card, .portfolio-item, .about-content, .about-image {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animated, 
    .portfolio-item.animated, 
    .about-content.animated, 
    .about-image.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }
    
    .portfolio-item:nth-child(1) { transition-delay: 0.1s; }
    .portfolio-item:nth-child(2) { transition-delay: 0.2s; }
    .portfolio-item:nth-child(3) { transition-delay: 0.3s; }
    .portfolio-item:nth-child(4) { transition-delay: 0.4s; }
    
    .about-content { transition-delay: 0.2s; }
    .about-image { transition-delay: 0.4s; }
`;
document.head.appendChild(style);

// Adicione estas funções ao seu script.js

// Filtro da Galeria
function setupGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Carregar Mais Itens
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMore');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    
    if (loadMoreBtn && hiddenItems.length > 0) {
        // Mostrar apenas os primeiros 12 itens inicialmente
        const allItems = document.querySelectorAll('.gallery-item');
        allItems.forEach((item, index) => {
            if (index >= 12) {
                item.classList.add('hidden');
            }
        });
        
        loadMoreBtn.addEventListener('click', function() {
            const currentlyHidden = document.querySelectorAll('.gallery-item.hidden');
            const toShow = Math.min(6, currentlyHidden.length);
            
            for (let i = 0; i < toShow; i++) {
                currentlyHidden[i].classList.remove('hidden');
            }
            
            // Esconder botão quando não houver mais itens
            if (document.querySelectorAll('.gallery-item.hidden').length === 0) {
                loadMoreBtn.style.display = 'none';
            }
        });
    } else if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

// Chame estas funções no DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    // Novas funções para a galeria
    setupGalleryFilter();
    setupLoadMore();
    
    // Verifica se está na página de galeria para inicializar
    if (document.querySelector('.gallery-main')) {
        initializeGallery();
    }
});

function initializeGallery() {
    // Animação dos itens da galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    galleryItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}