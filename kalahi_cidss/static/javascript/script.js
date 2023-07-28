/* 
    Helper Functions
*/

function isMobileDevice() {
    return 'ontouchstart' in window || 'DeviceOrientationEvent' in window;
}

function checkOrientation() {
    return window.matchMedia("(orientation: portrait)").matches
        ? true
        : window.matchMedia("(orientation: landscape)").matches
            ? false
            : null;
}

document.addEventListener('DOMContentLoaded', function () {
    document.body.style.fontSize = isMobileDevice() ? '1px' : '16px';
});

/*
    Navigation Bar
*/

// Mobile Navigation Bar Scrolling
function slideUpNavbarOnScroll() {
    const navbar = document.querySelector("nav");
    if (isMobileDevice()) {
        window.addEventListener("scroll", function () {
            const scrollOffset = window.scrollY;
            navbar.style.transform = `translateY(-${scrollOffset}px)`;
        });
    }
}
document.addEventListener("DOMContentLoaded", slideUpNavbarOnScroll);



/* 
    Home | Hero
*/
// Hero Background Parallax
// Function to handle the parallax effect
function parallaxEffect() {
    const image = document.querySelector('.hero-image img');
    const scrollPosition = window.scrollY;

    // Adjust the position of the background image based on the scroll position
    image.style.transform = `translateY(-${scrollPosition * 0.15}px)`;
}

// Attach the 'parallaxEffect' function to the 'scroll' event
window.addEventListener('scroll', parallaxEffect);
