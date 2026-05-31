function kelolaStatusKreatif() {
    const badge = document.getElementById('statusBadge');
    const teks = document.getElementById('statusText');
    
    if (!badge || !teks) return;

    const statusManual = badge.getAttribute('data-manual-status');
    const jamSekarang = new Date().getHours();
    
    let isBusy = false;
    let targetTeks = '';

    // 1. Tentukan status riil
    if (statusManual === 'busy') {
        targetTeks = 'Currently working on a project';
        isBusy = true;
    } else {
        if (jamSekarang >= 22 || jamSekarang < 5) {
            targetTeks = 'Currently resting - Response may be delayed';
            isBusy = true;
        } else {
            targetTeks = 'Available for new projects & collaborations';
            isBusy = false;
        }
    }

    // 2. Pasang class animasi slide
    teks.classList.add('glitch-flip');
    
    // 3. 🎯 SINKRONISASI TIMING SLIDE
    // Ganti teks tepat di milidetik ke-250 (pas teks lama sudah meluncur ke atas & menghilang)
    setTimeout(() => {
        if (isBusy) {
            badge.classList.add('busy');
        } else {
            badge.classList.remove('busy');
        }
        teks.innerText = targetTeks;
    }, 250); 

    // Hapus class animasi setelah seluruh rangkaian slide selesai (500ms)
    setTimeout(() => {
        teks.classList.remove('glitch-flip');
    }, 500); 
}

// 🎯 VERSI FIX: DETEKTOR GARIS NAVBAR SUPER SENSITIF & AKURAT
function aktifkanTransisiSection() {
    const semuaSection = document.querySelectorAll('section');
    const semuaNavLink = document.querySelectorAll('nav a');

    const opsiObserver = {
        root: null,
        threshold: 0.1,
        rootMargin: "-20% 0px -30% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-active');

                const idSection = entry.target.getAttribute('id');
                if (idSection) {
                    semuaNavLink.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${idSection}` || link.getAttribute('href') === `index.html#${idSection}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, opsiObserver);

    semuaSection.forEach(section => {
        observer.observe(section);
    });
}

function initRevealAnimations() {
    const selectorList = [
        'header',
        '#home .home-img',
        '#home .home-content',
        '.services .heading',
        '.service-box',
        '.skills .heading',
        '.skills-wrapper',
        '.education .heading',
        '.education-card',
        '.experience-section .heading',
        '.exp-card',
        '.contact-section .heading',
        '.contact-info',
        '.contact-form-box',
        '.faq-item',
        '.info-item',
        '.social-icons a',
        '.input-group'
    ];

    const targets = document.querySelectorAll(selectorList.join(','));
    targets.forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -15% 0px'
    });

    targets.forEach(el => revealObserver.observe(el));
}

function initScrollDirection() {
    let lastScroll = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScroll + 10) {
            document.body.classList.add('scrolling-down');
            document.body.classList.remove('scrolling-up');
        } else if (currentScroll < lastScroll - 10) {
            document.body.classList.add('scrolling-up');
            document.body.classList.remove('scrolling-down');
        }
        lastScroll = currentScroll;
    }, { passive: true });
}

function initPhotoPopup() {
    const popupOverlay = document.getElementById('imagePopupOverlay');
    const popupImg = document.getElementById('imagePopupImg');
    const popupTitle = document.getElementById('popupImageTitle');
    const closeButton = document.getElementById('imagePopupClose');

    if (!popupOverlay || !popupImg || !popupTitle || !closeButton) return;

    const openPhoto = (img) => {
        popupImg.src = img.src;
        popupImg.alt = img.alt || 'Gallery photo';
        popupTitle.textContent = img.dataset.photoTitle || img.alt || 'Photo preview';
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        popupOverlay.setAttribute('aria-hidden', 'false');
    };

    const closePopup = () => {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        popupOverlay.setAttribute('aria-hidden', 'true');
    };

    document.querySelectorAll('.popup-photo').forEach(photo => {
        photo.style.cursor = 'pointer';
        photo.addEventListener('click', () => openPhoto(photo));
    });

    closeButton.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) closePopup();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    aktifkanTransisiSection();
    kelolaStatusKreatif();
    initRevealAnimations();
    initScrollDirection();
    initPhotoPopup();
});