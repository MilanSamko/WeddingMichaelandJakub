// ============================================
// HAMBURGER MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInOnScroll 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ============================================
// TIMELINE ANIMATION
// ============================================

const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInOnScroll 0.8s ease ${index * 0.1}s forwards`;
            timelineObserver.unobserve(entry.target);
        }
    });
}, timelineObserverOptions);

timelineItems.forEach(item => {
    item.style.opacity = '0';
    timelineObserver.observe(item);
});

// ============================================
// SCROLL HINT ANIMATION REMOVAL
// ============================================

const scrollHint = document.querySelector('.scroll-hint');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollHint.style.opacity = '0';
        scrollHint.style.pointerEvents = 'none';
    }
}, { once: false });

// ============================================
// COLOR ITEM TOOLTIP
// ============================================

const colorItems = document.querySelectorAll('.color-item');

colorItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const title = this.getAttribute('title');
        if (title) {
            this.style.cursor = 'pointer';
        }
    });
});

// ============================================
// GALERIE LIGHTBOX
// ============================================

const galleryImages = Array.from(document.querySelectorAll('.gallery-grid .gallery-image'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');
let currentIndex = 0;

if (lightbox && galleryImages.length) {
    const updateLightbox = (index) => {
        const img = galleryImages[index];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;
    };

    const openLightbox = (index) => {
        currentIndex = index;
        updateLightbox(currentIndex);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (lightboxClose) {
            lightboxClose.focus();
        }
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox(currentIndex);
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightbox(currentIndex);
    };

    const touch = {
        startX: 0,
        endX: 0,
    };

    const handleTouchStart = (e) => {
        touch.startX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        touch.endX = e.changedTouches[0].screenX;
        const delta = touch.endX - touch.startX;
        if (Math.abs(delta) < 30) return;
        if (delta > 0) {
            showPrev();
        } else {
            showNext();
        }
    };

    galleryImages.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrev);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    lightboxImg.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightboxImg.addEventListener('touchend', handleTouchEnd, { passive: true });
    lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}
