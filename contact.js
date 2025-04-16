// 3D Card Effect for Info Cards
const infoCards = document.querySelectorAll('.info-card');

infoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// 3D Form Effect
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    input.addEventListener('focus', () => {
        group.style.transform = 'translateZ(20px)';
        label.style.transform = 'translateZ(30px)';
    });
    
    input.addEventListener('blur', () => {
        group.style.transform = 'translateZ(0)';
        label.style.transform = 'translateZ(0)';
    });
});

// Form Submission with 3D Animation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Create success message with 3D effect
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Message sent successfully!</span>
    `;
    document.body.appendChild(successMessage);
    
    // Animate success message
    setTimeout(() => {
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 3000);
    }, 100);

    // Reset form with 3D animation
    const formElements = contactForm.elements;
    Array.from(formElements).forEach(element => {
        element.style.transform = 'translateZ(-20px)';
        element.style.opacity = '0';
        setTimeout(() => {
            element.value = '';
            element.style.transform = 'translateZ(0)';
            element.style.opacity = '1';
        }, 300);
    });
});

// 3D Parallax Effect for Background
document.addEventListener('mousemove', (e) => {
    const contactPage = document.querySelector('.contact-page');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    contactPage.style.backgroundPosition = `${mouseX * 50}% ${mouseY * 50}%`;
});

// Smooth Scroll for Navigation Links
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

// Add 3D effect to social icons
const socialIcons = document.querySelectorAll('.social-links a');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'translateZ(50px) rotateY(360deg)';
    });
    
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'translateZ(0) rotateY(0)';
    });
});

// Add 3D effect to submit button
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('mouseover', () => {
    submitBtn.style.transform = 'translateZ(30px) scale(1.05)';
});

submitBtn.addEventListener('mouseout', () => {
    submitBtn.style.transform = 'translateZ(15px) scale(1)';
});

// Add 3D effect to form container
const formContainer = document.querySelector('.contact-form-container');
formContainer.addEventListener('mousemove', (e) => {
    const rect = formContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;
    
    formContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
});

formContainer.addEventListener('mouseleave', () => {
    formContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(20px)';
}); 