document.addEventListener('DOMContentLoaded', function () {
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Initialize users array in localStorage if it doesn't exist
    if (!localStorage.getItem('registeredUsers')) {
        localStorage.setItem('registeredUsers', JSON.stringify([]));
    }

    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        console.log('Login form found');
        loginForm.addEventListener('submit', function (e) {
            console.log('Login form submitted');
            e.preventDefault();

            // Get form data
            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            console.log('Form data:', formData);

            // Validate form
            if (!formData.email || !formData.password) {
                console.log('Form validation failed');
                showError('Please fill in all fields');
                return;
            }

            // Get all registered users
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));
            
            // Find user with matching email
            const user = registeredUsers.find(user => user.email === formData.email);
            
            if (!user) {
                console.log('User not found');
                showError('Email not registered. Please register first.');
                return;
            }

            // Validate password
            if (formData.password !== user.password) {
                console.log('Invalid password');
                showError('Invalid password');
                return;
            }

            // Store current user details in localStorage
            const userDetails = {
                email: user.email,
                name: user.name,
                phone: user.phone
            };
            localStorage.setItem('user_details', JSON.stringify(userDetails));
            console.log('User details stored in localStorage');

            // Show success message
            showSuccess('Login successful!');
            console.log('Success message shown');

            // Redirect to home page immediately
            console.log('Redirecting to index.html');
            window.location.href = 'index.html';
        });
    } else {
        console.log('Login form not found');
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const phone = this.querySelector('#phone').value;
            const password = this.querySelector('#password').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;

            // Basic validation
            if (!name || !email || !phone || !password || !confirmPassword) {
                showError('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }

            if (!this.querySelector('input[name="terms"]').checked) {
                showError('Please agree to the terms and conditions');
                return;
            }

            // Get existing users
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));
            
            // Check if email already exists
            if (registeredUsers.some(user => user.email === email)) {
                showError('Email already registered');
                return;
            }

            // Create new user object
            const newUser = {
                name: name,
                email: email,
                phone: phone,
                password: password
            };

            // Add new user to the array
            registeredUsers.push(newUser);
            
            // Save updated users array
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            // Show success message
            showSuccess('Registration successful!');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');

    socialButtons.forEach(button => {
        button.addEventListener('click', function () {
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            showMessage(`Redirecting to ${platform} login...`);
            // Add actual social login implementation here
        });
    });

    // Helper functions
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        const form = document.querySelector('.auth-form');
        const existingError = form.querySelector('.error-message');

        if (existingError) {
            existingError.remove();
        }

        form.insertBefore(errorDiv, form.firstChild);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;

        const form = document.querySelector('.auth-form');
        const existingSuccess = form.querySelector('.success-message');

        if (existingSuccess) {
            existingSuccess.remove();
        }

        form.insertBefore(successDiv, form.firstChild);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    function showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = message;

        const form = document.querySelector('.auth-form');
        const existingMessage = form.querySelector('.success-message');

        if (existingMessage) {
            existingMessage.remove();
        }

        form.insertBefore(messageDiv, form.firstChild);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}); 