function parallaxEffect() {
    const image = document.querySelector('.hero-image img');
    const scrollPosition = window.scrollY;

    // Adjust the position of the background image based on the scroll position
    image.style.transform = `translateY(-${scrollPosition * 0.15}px)`;
}

// Attach the 'parallaxEffect' function to the 'scroll' event
window.addEventListener('scroll', parallaxEffect);