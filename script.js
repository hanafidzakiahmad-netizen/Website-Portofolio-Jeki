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

// 🎯 VERSI FIX: DETEKTOR GARIS NAVBAR SUPER STABIL
function aktifkanTransisiSection() {
    const semuaSection = Array.from(document.querySelectorAll('section[id]'));
    const semuaNavLink = Array.from(document.querySelectorAll('nav a'));

    function updateNavActive() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let activeId = semuaSection[0] ? semuaSection[0].id : null;

        semuaSection.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
                activeId = section.id;
            }
        });

        semuaNavLink.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${activeId}` || href === `index.html#${activeId}`;
            link.classList.toggle('active', isActive);
        });
    }

    window.addEventListener('scroll', updateNavActive, { passive: true });
    window.addEventListener('touchmove', updateNavActive, { passive: true });
    window.addEventListener('resize', updateNavActive);
    window.addEventListener('orientationchange', updateNavActive);
    window.addEventListener('load', updateNavActive);
    updateNavActive();
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

function initExpCardPopup() {
    const overlay   = document.getElementById('expPopupOverlay');
    const closeBtn  = document.getElementById('expPopupClose');
    const popupImg  = document.getElementById('expPopupImg');
    const popupBadge = document.getElementById('expPopupBadge');
    const popupDate = document.getElementById('expPopupDate');
    const popupTitle = document.getElementById('expPopupTitle');
    const popupDesc = document.getElementById('expPopupDesc');
 
    if (!overlay) return;
 
    // Open popup and fill it with the clicked card's data
    function openPopup(card) {
        const img   = card.querySelector('.main-photo img');
        const badge = card.querySelector('.exp-badge');
        const date  = card.querySelector('.exp-date');
        const title = card.querySelector('.exp-content h3');
        const desc  = card.querySelector('.exp-content p');
 
        popupImg.src     = img  ? img.src  : '';
        popupImg.alt     = img  ? (img.alt || '') : '';
        popupBadge.textContent = badge ? badge.textContent : '';
        popupDate.textContent  = date  ? date.textContent  : '';
        popupTitle.textContent = title ? title.textContent : '';
        popupDesc.textContent  = desc  ? desc.textContent  : '';
 
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
 
    function closePopup() {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
 
    // Attach click listener to every exp-card
    document.querySelectorAll('.exp-card').forEach(card => {
        card.addEventListener('click', () => openPopup(card));
    });
 
    // Close on ×, backdrop click, or Escape key
    closeBtn.addEventListener('click', closePopup);
 
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
 
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
    });
}
 
// Run after DOM is ready
document.addEventListener('DOMContentLoaded', initExpCardPopup);
function closeLightbox() {
    const modal = document.getElementById('imageLightbox');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}