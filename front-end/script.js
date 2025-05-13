// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            // Toggle hamburger animation
            hamburger.classList.toggle('active');
            
            // Toggle nav links visibility
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on a nav link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation to elements when they come into view
var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .stat-card, .chart-card, .activity-item').forEach(element => {
    observer.observe(element);
});

// Theme persistence
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
}

// Update theme toggle icon based on current theme
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Handle form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Form submitted successfully!';
                form.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }, 1500);
        }
    });
});

// Add success message styles
const successStyles = `
    .success-message {
        background: #2ecc71;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease forwards;
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = successStyles;
document.head.appendChild(styleSheet);

// 3D Card Effect
const cards = document.querySelectorAll('.waste-card, .solution-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Scroll Animation with 3D Effect
var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Add 3D rotation effect
            entry.target.style.transform = 'rotateX(0) translateZ(0)';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.waste-card, .solution-card, section').forEach(el => {
    el.style.transform = 'rotateX(20deg) translateZ(-100px)';
    el.style.opacity = '0';
    el.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
    observer.observe(el);
});

// 3D Text Effect for Hero Title
const heroTitle = document.querySelector('.hero h1');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const rect = heroTitle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (mouseY - centerY) / 20;
    const rotateY = (centerX - mouseX) / 20;
    
    heroTitle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Add 3D hover effect to social icons
const socialIcons = document.querySelectorAll('.social-links a');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'translateZ(50px) rotateY(360deg)';
    });
    
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'translateZ(0) rotateY(0)';
    });
});

// Add 3D effect to form inputs
const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.transform = 'translateZ(20px)';
        input.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    
    input.addEventListener('blur', () => {
        input.style.transform = 'translateZ(10px)';
        input.style.boxShadow = 'none';
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status and update UI
    const userProfile = document.getElementById('userProfile');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const userName = document.querySelector('.user-name');

    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    if (userDetails) {
        // User is logged in
        userProfile.style.display = 'flex';
        userName.textContent = userDetails.name;
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
    } else {
        // User not logged in
        userProfile.style.display = 'none';
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('user_details');
            window.location.href = 'index.html';
        });
    }

    // Highlight current page link
    const currentLocation = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}); 