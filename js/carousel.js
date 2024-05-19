document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('carousel-container');
    const bigDiv = document.querySelector('.wrapper');
    let currentSlide = 0;

    const slides = Array.from(bigDiv.children);
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth;
    const cardCountPerSlide = 3;

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const carouselNav = document.getElementById('carousel-nav');
    const navCircles = carouselNav.querySelectorAll('.nav-circle');

    function updateCarouselPosition() {
        bigDiv.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarouselPosition();
        updateActiveCircle();
    }

    function updateActiveCircle() {
        for (let i = 0; i < navCircles.length; i++) {
            navCircles[i].classList.remove('active');
            if (i === currentSlide) {
                navCircles[i].classList.add('active');
            }
        }
    }

    prevButton.addEventListener('click', () => {
        currentSlide--;
        if (currentSlide < 0) currentSlide = totalSlides - cardCountPerSlide;
        goToSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide >= totalSlides) currentSlide = 0;
        goToSlide(currentSlide);
    });

    // Initialize the carousel to show the first slide
    goToSlide(0);

    // Lazy loading for images
    const images = document.querySelectorAll('.card img');
    images.forEach((img) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const src = entry.target.getAttribute('data-src');
                    if (src) {
                        entry.target.src = src;
                        entry.target.removeAttribute('data-src');
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.1 });

        observer.observe(img);
    });
});
