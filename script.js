document.addEventListener('DOMContentLoaded', function() {

    // --- Interactive Header Logic ---
    const header = document.getElementById('main-header');
    const isHomePage = document.querySelector('#hero') !== null;
    let activityTimer;

    if (isHomePage) {
        const makeHeaderTransparent = () => {
            if (window.scrollY < 50) {
                header.classList.remove('header-active');
            }
        };
        const showHeaderTemporarily = () => {
            clearTimeout(activityTimer);
            header.classList.add('header-active');
            activityTimer = setTimeout(makeHeaderTransparent, 500);
        };
        window.addEventListener('mousemove', showHeaderTemporarily);
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-active');
                clearTimeout(activityTimer);
            } else {
                showHeaderTemporarily();
            }
        });
        makeHeaderTransparent();
    }


    // --- Hamburger Menu (UPDATED) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.main-nav');
    const body = document.querySelector('body');
    const hamburgerIcon = hamburger.querySelector('i');

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('nav-open');
            body.classList.toggle('nav-open');
            // Toggle between bars and times icon
            if (navMenu.classList.contains('nav-open')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-times');
            } else {
                hamburgerIcon.classList.remove('fa-times');
                hamburgerIcon.classList.add('fa-bars');
            }
        });
    }


    // --- Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });


    // --- Slideshow Logic ---
    const images = document.querySelectorAll('.slide-image');
    if (images.length > 0) {
        const prevArrow = document.getElementById('prev-arrow');
        const nextArrow = document.getElementById('next-arrow');
        let currentIndex = 0;
        const totalImages = images.length;

        const updateSlideshow = () => {
            images.forEach(img => {
                img.classList.remove('main-slide', 'left-slide', 'right-slide');
            });
            const leftIndex = (currentIndex - 1 + totalImages) % totalImages;
            const rightIndex = (currentIndex + 1) % totalImages;
            images[leftIndex].classList.add('left-slide');
            images[currentIndex].classList.add('main-slide');
            images[rightIndex].classList.add('right-slide');
        };

        nextArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlideshow();
        });
        prevArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlideshow();
        });
        updateSlideshow();
    }


    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');

        document.querySelectorAll('.slide-image').forEach(image => {
            image.addEventListener('click', (e) => {
                if (e.currentTarget.classList.contains('main-slide')) {
                    lightbox.style.display = 'block';
                    lightboxImg.src = image.src;
                }
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

});