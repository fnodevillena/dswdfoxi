// login.js

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

function adjustLogo() {
    const logoContainer = document.querySelector('.logo-container');
    const logo = document.querySelector('.logo-container img');

    if (isMobileDevice() && checkOrientation()) {
        logoContainer.style.marginBottom = '40px';
        logoContainer.style.marginTop = '20px';
        logoContainer.style.marginRight = '0';
        logo.style.maxHeight = '150px';
    } else if (isMobileDevice() && !checkOrientation()) {
        logoContainer.style.marginBottom = '0';
        logoContainer.style.marginTop = '0';
        logoContainer.style.marginRight = '20px';
        logo.style.maxHeight = '100px';
    } else {
        logo.style.maxHeight = '150px';
    }
}
document.addEventListener("DOMContentLoaded", adjustLogo);
window.addEventListener('resize', adjustLogo);

function adjustLoginForm() {
    const loginContainer = document.querySelector('.login-container');
    const inputs = document.querySelectorAll('.login-form input');
    const labels = document.querySelectorAll('.login-form label');
    const button = document.querySelector('.login-form button');
    const error = document.querySelector('.messages');
    const errorSymbols = document.querySelectorAll('ul.messages li.error');

    isMobileDevice() && checkOrientation()
        ? (
            loginContainer.style.alignItems = 'unset',
            loginContainer.style.width = '75%',
            loginContainer.style.flexDirection = 'column',
            loginContainer.style.justifyContent = 'center',
            labels.forEach(label => label.style.fontSize = '1rem'),
            inputs.forEach(input => input.style.padding = '1rem'),
            inputs.forEach(input => input.style.fontSize = '1rem'),
            button.style.padding = '1rem',
            button.style.fontSize = '1rem',
            errorSymbols.forEach(symbol => symbol.style.fontSize = '0.75rem'),
            errorSymbols.forEach(symbol => symbol.style.paddingInlineStart = '0.75ch'),
            error.style.fontSize = '0.75rem'
        )
        : isMobileDevice() && !checkOrientation()
        ? (
            loginContainer.style.width = '50%',
            loginContainer.style.flexDirection = 'row',
            loginContainer.style.justifyContent = 'flex-start',
            labels.forEach(label => label.style.fontSize = '0.5rem'),
            inputs.forEach(input => input.style.padding = '0.5rem'),
            inputs.forEach(input => input.style.fontSize = '0.5rem'),
            button.style.padding = '0.5rem',
            button.style.fontSize = '0.5rem',
            errorSymbols.forEach(symbol => symbol.style.fontSize = '0.4rem'),
            errorSymbols.forEach(symbol => symbol.style.paddingInlineStart = '0.4ch'),
            error.style.fontSize = '0.4rem'
        )
        : null;
}
window.addEventListener('resize', adjustLoginForm);
document.addEventListener('DOMContentLoaded', adjustLoginForm);
