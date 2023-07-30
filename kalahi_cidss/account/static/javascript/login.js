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
    const loginContainer = document.querySelector('.login-container');
    const logoContainer = document.querySelector('.logo-container');
    const logo = document.querySelector('.logo-container img');

    isMobileDevice() && checkOrientation()
        ? (
            loginContainer.style.flexDirection = 'column',
            loginContainer.style.alignItems = 'center',
            loginContainer.style.justifyContent = 'center',
            logoContainer.style.marginRight = '0',
            logoContainer.style.marginBottom = '40px',
            logoContainer.style.marginTop = '20px',
            logo.style.maxHeight = '200px'
        )
        : (
            loginContainer.style.flexDirection = 'row',
            loginContainer.style.alignItems = 'center',
            loginContainer.style.justifyContent = 'flex-start',
            logoContainer.style.marginRight = '20px',
            logo.style.maxHeight = '100px'
        );
}

function adjustLoginForm() {
    const loginContainer = document.querySelector('.login-container');
    const loginForm = document.querySelector('.login-form');
    const inputs = document.querySelectorAll('.login-form input');
    const labels = document.querySelectorAll('.login-form label');
    const button = document.querySelector('.login-form button');
    const windowWidth = window.innerWidth;
    const maxWidth = 500;
    const padding = 20;

    const newWidth = Math.min(maxWidth, windowWidth - 2 * padding);

    isMobileDevice() && checkOrientation()
        ? (
            loginContainer.style.alignItems = 'unset',
            loginContainer.style.width = '90%',
            labels.forEach(label => label.style.fontSize = '1.75rem'),
            inputs.forEach(input => input.style.padding = '30px'),
            inputs.forEach(input => input.style.fontSize = '1.75rem'),
            button.style.padding = '40px',
            button.style.fontSize = '1.75rem',
            loginForm.style.borderRadius = '15px' // Adjust border radius for the login form
        )
        : (
            // Reset styles for other cases
            loginForm.style.maxWidth = '500px',
            loginForm.style.fontSize = '0.85rem',
            loginForm.style.padding = '20px',
            loginForm.style.borderRadius = '10px',
            loginContainer.style.width = newWidth + 'px'
        );
}

window.addEventListener('orientationchange', function () {
    adjustLogo();
    adjustLoginForm();
});

window.addEventListener('DOMContentLoaded', function () {
    adjustLogo();
    adjustLoginForm();
});

window.addEventListener('resize', function () {
    adjustLogo();
    adjustLoginForm();
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const formData = new FormData(this);

    // Send the AJAX request using Fetch API
    fetch("{% url 'sign_in' %}", {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest', // Add this header to identify AJAX requests on the server-side (optional)
            'X-CSRFToken': '{{ csrf_token }}', // Add the CSRF token (Django requires this for POST requests)
        }
    })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            if (data.success) {
                // Handle successful login, e.g., show a success message or redirect to another page
                alert("Login successful!");
                window.location.href = "{% url 'home' %}";  // Replace 'home' with the URL name of your home page view
            } else {
                // Handle login error, e.g., show an error message
                alert("Login failed. Invalid username or password.");
            }
        })
        .catch(error => {
            // Handle network errors or exceptions
            alert("An error occurred. Please try again later.");
        });
});