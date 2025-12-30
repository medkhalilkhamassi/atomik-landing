document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for 'Reveal' Animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // 2. Slide Counter & Active State
    const slides = document.querySelectorAll('.slide');
    const indicator = document.getElementById('slide-indicator');
    const totalSlides = slides.length;

    const slideObserverOptions = {
        root: document.querySelector('.slides-container'),
        threshold: 0.5
    };

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate index dynamically based on DOM order
                const index = Array.from(slides).indexOf(entry.target) + 1;
                indicator.textContent = `${index.toString().padStart(2, '0')} / ${totalSlides}`;
            }
        });
    }, slideObserverOptions);

    slides.forEach(slide => slideObserver.observe(slide));

    // 3. Keyboard Navigation Support
    // We handle this manually because relying solely on scroll-snap focus can be glitchy
    const container = document.querySelector('.slides-container');

    document.addEventListener('keydown', (e) => {
        const currentScroll = container.scrollTop;
        const viewportHeight = window.innerHeight;

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            container.scrollBy({ top: viewportHeight, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            container.scrollBy({ top: -viewportHeight, behavior: 'smooth' });
        }
    });

    // 4. Dot Navigation Generation & Handling
    const dotContainer = document.getElementById('nav-dots');

    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        // Get slide title or id for tooltip
        const slideId = slide.id;
        const slideTitle = slide.querySelector('h1, h2')?.textContent || slideId;
        dot.setAttribute('data-label', slideTitle);
        dot.setAttribute('data-target', slideId);

        dot.addEventListener('click', () => {
            slide.scrollIntoView({ behavior: 'smooth' });
        });

        dotContainer.appendChild(dot);
    });

    // Update Dots on Scroll (Reuse existing observer logic)
    const updateActiveDot = (index) => {
        document.querySelectorAll('.nav-dot').forEach((d, i) => {
            if (i + 1 == index) d.classList.add('active');
            else d.classList.remove('active');
        });
    };

    // Modify the existing slide observer to also update dots
    // We need to unobserve first or just create a new wrapper mechanism.
    // Simpler: let's just append the logic to the existing callback wrapper if we could, 
    // but since we are appending code, let's create a specific observer for dots or piggyback.
    // The previous observer was `slideObserver`. We can't easily modify its callback reference without rewriting.
    // So we will add a secondary observer for dots to keep code clean.

    const dotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(slides).indexOf(entry.target) + 1;
                updateActiveDot(index);
            }
        });
    }, { root: document.querySelector('.slides-container'), threshold: 0.5 });

    slides.forEach(slide => dotObserver.observe(slide));

    // 5. Arrow Navigation
    document.getElementById('btn-up').addEventListener('click', () => {
        const viewportHeight = window.innerHeight;
        container.scrollBy({ top: -viewportHeight, behavior: 'smooth' });
    });

    document.getElementById('btn-down').addEventListener('click', () => {
        const viewportHeight = window.innerHeight;
        container.scrollBy({ top: viewportHeight, behavior: 'smooth' });
    });

});
