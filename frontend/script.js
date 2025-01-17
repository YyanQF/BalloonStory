// when the user slides the lines will slowly appear

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide .line');

    const observerOptions = {
        threshold: 0.5 
    };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // the animation
                entry.target.classList.add('fade-in'); 
                observer.unobserve(entry.target); 
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    slides.forEach(slide => observer.observe(slide));
});