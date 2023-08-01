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

function adjustFont() {
    document.body.style.fontSize = isMobileDevice()
    ? (checkOrientation() ? '12px' : '14px')
    : '16px';
}
document.addEventListener("DOMContentLoaded", slideUpNavbarOnScroll);


document.addEventListener('DOMContentLoaded', function () {
    document.body.style.fontSize = isMobileDevice() ? '12px' : '16px';
});

/*
    Navigation Bar
*/
function slideUpNavbarOnScroll() {
    const navbar = document.querySelector("nav");
    if (isMobileDevice()) {
        window.addEventListener("scroll", function () {
            const scrollOffset = window.scrollY;
            navbar.style.transform = `translateY(-${scrollOffset}px)`;
        });
    }
}

function adjustNavbarHeight() {
    const navbar = document.querySelector("nav");
    const orientation = checkOrientation();

    navbar.style.height = isMobileDevice()
        ? (orientation ? '25px' : '30px')
        : '50px';
}
document.addEventListener("DOMContentLoaded", adjustNavbarHeight);
window.addEventListener('resize', adjustNavbarHeight);

function adjustNavbar() {
    const navbarLogo = document.querySelector("nav img.logo");
    const navbarIcons = document.querySelectorAll("nav img.icon");
    const sidebar = document.querySelector("aside");

    navbarLogo.style.width = isMobileDevice()
        ? (checkOrientation() ? '100px' : '125px')
        : '150px';
    navbarIcons.forEach(icon => {
        icon.style.display = isMobileDevice()
            ? 'none'
            : 'block';
    });
    sidebar.style.width = isMobileDevice()
        ? (checkOrientation() ? '50%' : '25%')
        : null;
}
document.addEventListener("DOMContentLoaded", adjustNavbar);
window.addEventListener('resize', adjustNavbar);

function toggleSidebar() {
    const sidebar = document.querySelector('aside');
    const overlay = document.querySelector('.overlay');
    const isActive = sidebar.classList.toggle('active');

    overlay.style.display = 'block';

    setTimeout(function () {
        overlay.style.opacity = isActive ? '1' : '0';
        if (!isActive) {
            setTimeout(function () {
                overlay.style.display = 'none';
            }, 300);
        }
    }, 10);

    document.body.style.overflow = isActive ? 'hidden' : 'auto';
}

function toggleNavbarLogo() {
    const logo = document.querySelector("nav img.logo");
    const homeURL = "/";

    logo.addEventListener("click", function () {
        if (isMobileDevice()) {
            toggleSidebar();
        } else {
            window.location.href = homeURL;
        }
    });
}
document.addEventListener("DOMContentLoaded", toggleNavbarLogo);


// Account Menu
document.addEventListener("DOMContentLoaded", function () {
    const accountIcon = document.getElementById("account-icon");
    const accountMenu = document.querySelector("ul.account-menu");

    accountIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        accountMenu.style.display = accountMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function () {
        accountMenu.style.display = "none";
    });
});

function adjustSidebar() {
    const sidebar = document.querySelector("aside");
    const sidebarList = document.querySelector("aside ul");

    sidebar.style.display = isMobileDevice() ? 'block' : 'none';
    sidebarList.style.display = isMobileDevice() ? 'block' : 'none';
}
document.addEventListener("DOMContentLoaded", adjustSidebar);
window.addEventListener('resize', adjustSidebar);

// Hero
function parallaxEffect() {
    const image = document.querySelector('.hero-image img');
    const scrollPosition = window.scrollY;

    image.style.transform = `translateY(-${scrollPosition * 0.15}px)`;
}
window.addEventListener('scroll', parallaxEffect);

function adjustHero() {
    const hero = document.querySelector('header.hero')
    const heroIcon = document.querySelector('header.hero .hero-content .hero-icon img');
    const heroH1 = document.querySelector('header.hero .hero-content .hero-text h1');
    const heroH2 = document.querySelector('header.hero .hero-content .hero-text h2');

    hero.style.height = isMobileDevice()
        ? (checkOrientation() ? '150px' : '300px')
        : '500px';
    heroIcon.style.height = isMobileDevice()
        ? (checkOrientation() ? '75px' : '125px')
        : '175px';
    heroH1.style.fontSize = isMobileDevice()
        ? (checkOrientation() ? '1rem' : '1.75rem')
        : '3rem';
    heroH2.style.fontSize = isMobileDevice()
        ? (checkOrientation() ? '0.75rem' : '1.25rem')
        : '1.5rem';
}
document.addEventListener("DOMContentLoaded", adjustHero);
window.addEventListener('resize', adjustHero);