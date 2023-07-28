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
    document.body.style.fontSize = isMobileDevice() ? '12px' : '16px';
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

function adjustNavbarHeight() {
    const navbar = document.querySelector("nav");
    const sidebarPadding = document.querySelector("aside .sidebar-divider");
    const orientation = window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';

    navbar.style.height = isMobileDevice()
        ? (orientation === 'portrait' ? '95px' : '60px')
        : '50px';

    sidebarPadding.style.marginTop = isMobileDevice()
        ? (orientation === 'portrait' ? '105px' : '70px')
        : '60px';
}
document.addEventListener("DOMContentLoaded", adjustNavbarHeight);
window.addEventListener('resize', adjustNavbarHeight);

function adjustNavbarLogo() {
    const navbarLogo = document.querySelector("nav img");
    const sidebar = document.querySelector("aside");
    const sidebarPadding = document.querySelector("aside .sidebar-divider");
    const orientation = window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';

    navbarLogo.style.width = isMobileDevice()
        ? (orientation === 'portrait' ? '250px' : '200px')
        : '150px';

    sidebar.style.width = isMobileDevice()
        ? (orientation === 'portrait' ? '250px' : '200px')
        : '150px';

    sidebarPadding.style.width = isMobileDevice()
        ? (orientation === 'portrait' ? '270px' : '220px')
        : '170px';
}
document.addEventListener("DOMContentLoaded", adjustNavbarLogo);
window.addEventListener('resize', adjustNavbarLogo);

function toggleNavbarList() {
    const navbarDivider = document.querySelector("nav .navbar-divider");
    const navbarList = document.querySelector("nav ul");

    navbarDivider.style.display = isMobileDevice() ? 'none' : 'block';
    navbarList.style.display = isMobileDevice() ? 'none' : 'block';
}
document.addEventListener("DOMContentLoaded", toggleNavbarList);
window.addEventListener('resize', toggleNavbarList);

function toggleSidebar() {
    const sidebar = document.querySelector('aside');
    const overlay = document.querySelector('.overlay');
    const isActive = sidebar.classList.toggle('active');
  
    overlay.style.display = isActive ? 'block' : 'none';
  }
  
  function toggleNavbarLogo() {
    const logo = document.querySelector("nav img");
    const desktopURL = "https://kalahi.dswd.gov.ph/";
  
    logo.addEventListener("click", function () {
      if (isMobileDevice()) {
        toggleSidebar();
      } else {
        window.location.href = desktopURL;
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", toggleNavbarLogo);


function hideSidebar() {
    const sidebar = document.querySelector("aside");
    const sidebarDivider = document.querySelector("aside .sidebar-divider");
    const sidebarList = document.querySelector("aside ul");

    sidebar.style.display = isMobileDevice() ? 'block' : 'none';
    sidebarDivider.style.display = isMobileDevice() ? 'block' : 'none';
    sidebarList.style.display = isMobileDevice() ? 'block' : 'none';
}
document.addEventListener("DOMContentLoaded", hideSidebar);
window.addEventListener('resize', hideSidebar);

  



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
