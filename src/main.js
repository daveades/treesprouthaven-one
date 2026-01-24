// Main JavaScript
import './components/AppNavbar.js';
import './components/AppFooter.js';

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
});

// FAQ Accordion
document.querySelectorAll('.faq-item .faq-question').forEach(button => {
    const item = button.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');

    if (answer) {
        answer.style.maxHeight = '0px';
    }

    button.addEventListener('click', () => {
        const isOpen = item.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(isOpen));
        if (answer) {
            answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
        }
    });
});


// Carousel Logic
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    // Note: We are using flexbox now, so manual left positioning might not be needed if we transform the track
    // But for a simple transform logic, let's just use the index.

    // Actually with flexbox, we don't need absolute positioning of slides.
    // We just translate the track.

    const moveToSlide = (track, currentSlide, targetSlide) => {
        // Find index of target slide
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        track.style.transform = 'translateX(-' + (targetIndex * 100) + '%)';

        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    }

    // Next Button
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });

    // Prev Button
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });

    // Dots Nav
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });

    // Touch / Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const threshold = 50; // min distance to be considered a swipe
        if (touchEndX < touchStartX - threshold) {
            // Swipe Left -> Next Slide
            if (!nextButton.classList.contains('is-hidden') || window.innerWidth <= 768) {
                // Check bounds
                const currentSlide = track.querySelector('.current-slide');
                const nextSlide = currentSlide.nextElementSibling;
                if (nextSlide) {
                    const currentDot = dotsNav.querySelector('.current-slide');
                    const nextDot = currentDot.nextElementSibling;
                    const nextIndex = slides.findIndex(slide => slide === nextSlide);

                    moveToSlide(track, currentSlide, nextSlide);
                    updateDots(currentDot, nextDot);
                    hideShowArrows(slides, prevButton, nextButton, nextIndex);
                }
            }
        }
        if (touchEndX > touchStartX + threshold) {
            // Swipe Right -> Prev Slide
            if (!prevButton.classList.contains('is-hidden') || window.innerWidth <= 768) {
                const currentSlide = track.querySelector('.current-slide');
                const prevSlide = currentSlide.previousElementSibling;
                if (prevSlide) {
                    const currentDot = dotsNav.querySelector('.current-slide');
                    const prevDot = currentDot.previousElementSibling;
                    const prevIndex = slides.findIndex(slide => slide === prevSlide);

                    moveToSlide(track, currentSlide, prevSlide);
                    updateDots(currentDot, prevDot);
                    hideShowArrows(slides, prevButton, nextButton, prevIndex);
                }
            }
        }
    };

    // Keyboard Navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;
            if (prevSlide) {
                const currentDot = dotsNav.querySelector('.current-slide');
                const prevDot = currentDot.previousElementSibling;
                const prevIndex = slides.findIndex(slide => slide === prevSlide);

                moveToSlide(track, currentSlide, prevSlide);
                updateDots(currentDot, prevDot);
                hideShowArrows(slides, prevButton, nextButton, prevIndex);
            }
        }
        if (e.key === 'ArrowRight') {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            if (nextSlide) {
                const currentDot = dotsNav.querySelector('.current-slide');
                const nextDot = currentDot.nextElementSibling;
                const nextIndex = slides.findIndex(slide => slide === nextSlide);

                moveToSlide(track, currentSlide, nextSlide);
                updateDots(currentDot, nextDot);
                hideShowArrows(slides, prevButton, nextButton, nextIndex);
            }
        }
    });
}
