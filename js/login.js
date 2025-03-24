document.addEventListener('DOMContentLoaded', function() {
    // Set up tab switching between login and register
    setupTabSwitching();
    
    // Set up form validation and submission
    setupLoginForm();
    setupRegisterForm();
});

function setupTabSwitching() {
    const loginTab = document.querySelector('.tab[data-tab="login"]');
    const registerTab = document.querySelector('.tab[data-tab="register"]');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToLoginButton = document.getElementById('switch-to-login');
    
    // Add active class to login tab by default
    loginTab.classList.add('active');
    loginForm.classList.add('active');
    
    // Switch to login tab
    loginTab.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    });
    
    // Switch to register tab
    registerTab.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        }
    });
    
    // Switch back to login from register form
    switchToLoginButton.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        
        // Basic validation
        if (email === '' || password === '') {
            alert('Please enter both email and password.');
            return;
        }
        
        // In a real application, this would make an API call to the server
        // For this example, we'll just simulate a login
        simulateLogin(email, password);
    });
}

function setupRegisterForm() {
    const registerForm = document.getElementById('register-form');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();
        const confirmPassword = document.getElementById('register-confirm-password').value.trim();
        const role = document.getElementById('user-role').value;
        
        // Basic validation
        if (name === '' || email === '' || password === '' || confirmPassword === '' || role === '') {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        
        // In a real application, this would make an API call to the server
        // For this example, we'll just simulate a registration
        simulateRegistration(name, email, password, role);
    });
}

function simulateLogin(email, password) {
    // Simple validation - in a real app, this would check against a database
    if (email === 'customer@example.com' && password === 'password123') {
        alert('Login successful!');
        // In a real app, you would redirect to the appropriate page
    } else if (email === 'artisan@example.com' && password === 'password123') {
        alert('Login successful!');
        // In a real app, you would redirect to the artisan dashboard
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

function simulateRegistration(name, email, password, role) {
    // Simple validation - in a real app, this would check against a database
    if (email === 'existing@example.com') {
        alert('This email is already registered. Please use a different email.');
        return;
    }
    
    alert(`Registration successful! Welcome ${name}.`);
    // In a real app, you would redirect to the login page
}