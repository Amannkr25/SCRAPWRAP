document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            // Validate form
            if (!formData.email || !formData.password) {
                showError('Please fill in all fields');
                return;
            }

            // Simulate API call
            setTimeout(() => {
                // Store user details in localStorage
                const userDetails = {
                    email: formData.email,
                    name: 'John Doe', // This would come from the API in a real app
                    phone: '1234567890' // This would come from the API in a real app
                };
                localStorage.setItem('user_details', JSON.stringify(userDetails));

                // Show success message
                showSuccess('Login successful!');

                // Redirect to home page after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 1000);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
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

            // Simulate registration process
            simulateRegistration(name, email, phone, password);
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
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

    function simulateRegistration(name, email, phone, password) {
        showMessage('Creating account...');
        // Simulate API call
        setTimeout(() => {
            // Redirect to login page or show success message
            window.location.href = 'login.html';
        }, 1500);
    }
}); 