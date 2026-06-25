document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       MOBILE MENU (Simples)
       ========================================================================== */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isDisplayed = window.getComputedStyle(navLinks).display !== 'none';
            if (isDisplayed && navLinks.style.display !== '') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(13, 27, 42, 0.98)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            }
        });
    }

    /* ==========================================================================
       ANIMATED COUNTERS
       ========================================================================== */
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Quanto menor, mais rápido

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                // Remove caracteres não numéricos para o cálculo
                const currentText = counter.innerText.replace(/[^0-9]/g, '');
                const count = +currentText;
                
                const inc = target / speed;

                if (count < target) {
                    // Mantém prefixos/sufixos baseados no elemento original
                    let prefix = counter.innerText.includes('+') ? '+' : '';
                    let suffix = counter.innerText.includes('%') ? '%' : (counter.innerText.includes('h') ? 'h' : '');
                    
                    counter.innerText = prefix + Math.ceil(count + inc) + suffix;
                    setTimeout(updateCount, 20);
                } else {
                    let prefix = counter.getAttribute('data-target') > 100 ? '+' : '';
                    let suffix = counter.nextElementSibling.innerText.includes('satisfeitos') ? '%' : (counter.nextElementSibling.innerText.includes('Tempo') ? 'h' : '');
                    counter.innerText = prefix + target + suffix;
                }
            };
            updateCount();
        });
    };

    // Usar Intersection Observer para rodar a animação só quando a seção aparecer
    const numbersSection = document.querySelector('.numbers');
    if (numbersSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(numbersSection);
    }

    /* ==========================================================================
       FAQ ACCORDION
       ========================================================================== */
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });
            
            // Se não estava ativo, abre
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       DEPOIMENTOS SLIDER
       ========================================================================== */
    const testimonials = [
        { name: "M. Silva", course: "Direito", text: "Excelente serviço! A revisão gramatical e a formatação ABNT ficaram perfeitas. Recomendo muito.", stars: 5, img: "https://ui-avatars.com/api/?name=M+S&background=0D1B2A&color=D4AF37" },
        { name: "J. Oliveira", course: "Medicina", text: "Me ajudaram na estruturação do meu TCC quando eu estava totalmente perdido. Prazo cumprido à risca.", stars: 5, img: "https://ui-avatars.com/api/?name=J+O&background=0D1B2A&color=D4AF37" },
        { name: "A. Costa", course: "Administração", text: "Os slides da minha defesa ficaram com um design absurdamente premium. A banca elogiou bastante.", stars: 5, img: "https://ui-avatars.com/api/?name=A+C&background=0D1B2A&color=D4AF37" },
        { name: "R. Mendes", course: "Engenharia Civil", text: "Atendimento rápido, claro e muito organizado. O pacote acadêmico valeu cada centavo.", stars: 5, img: "https://ui-avatars.com/api/?name=R+M&background=0D1B2A&color=D4AF37" },
        { name: "L. Ferreira", course: "Psicologia", text: "Minha dissertação de mestrado precisava de uma revisão crítica rigorosa. O resultado foi brilhante.", stars: 5, img: "https://ui-avatars.com/api/?name=L+F&background=0D1B2A&color=D4AF37" },
        { name: "P. Santos", course: "Odontologia", text: "Cumpriram o prazo de urgência e me entregaram um material impecável. O sigilo me passou muita segurança.", stars: 5, img: "https://ui-avatars.com/api/?name=P+S&background=0D1B2A&color=D4AF37" },
        { name: "C. Pereira", course: "Pedagogia", text: "Fiquei impressionada com o atendimento humanizado. Foram super pacientes com minhas dúvidas.", stars: 5, img: "https://ui-avatars.com/api/?name=C+P&background=0D1B2A&color=D4AF37" },
        { name: "E. Almeida", course: "Ciência da Computação", text: "Profissionais de altíssimo nível. A formatação do meu artigo para a revista científica ficou 100% aprovada.", stars: 5, img: "https://ui-avatars.com/api/?name=E+A&background=0D1B2A&color=D4AF37" }
    ];

    const slider = document.getElementById('slider');
    if (slider) {
        testimonials.forEach(test => {
            const div = document.createElement('div');
            div.className = 'testimonial-card';
            div.innerHTML = `
                <div class="stars">
                    ${Array(test.stars).fill('<i class="ph-fill ph-star"></i>').join('')}
                </div>
                <p>"${test.text}"</p>
                <div class="testimonial-author">
                    <img src="${test.img}" alt="${test.name}">
                    <div>
                        <h4>${test.name}</h4>
                        <span style="font-size: 0.85rem; color: var(--color-text-muted)">${test.course}</span>
                    </div>
                </div>
            `;
            slider.appendChild(div);
        });

        let currentIndex = 0;
        const totalSlides = testimonials.length;
        
        const updateSlider = () => {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        };

        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
        }

        // Auto slide
        setInterval(nextSlide, 5000);
    }

    /* ==========================================================================
       FORM SUBMISSION TO WHATSAPP
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const whatsappNumber = document.getElementById('whatsapp').value;
            const curso = document.getElementById('curso').value;
            const servico = document.getElementById('servico').value;
            const prazo = document.getElementById('prazo').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Número oficial da Smart
            const phone = "5581996491049"; 
            
            const text = `Olá! Meu nome é *${nome}* e gostaria de solicitar um orçamento.
            
*Resumo da Solicitação:*
- *WhatsApp/Contato:* ${whatsappNumber}
- *Curso/Área:* ${curso}
- *Serviço Desejado:* ${servico}
- *Prazo Desejado:* ${prazo ? prazo : 'A combinar'}

*Detalhes/Mensagem:*
${mensagem}

Aguardo o retorno. Obrigado!`;
            
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;
            
            // Redireciona para o WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }
});
