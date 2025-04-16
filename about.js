// 3D Card Effect for Team Members
document.querySelectorAll('.team-member').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// 3D Parallax Effect for Hero Section
const heroSection = document.querySelector('.hero-section');
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = heroSection.getBoundingClientRect();
    
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;
    
    heroSection.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
});

// 3D Timeline Effect
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateZ(50px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateZ(0)';
    });
});

// Scroll Animation with 3D Effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateZ(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card, .value-card, .team-member, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateZ(-50px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// 3D Text Effect for Headings
document.querySelectorAll('h1, h2').forEach(heading => {
    heading.addEventListener('mousemove', (e) => {
        const rect = heading.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        heading.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    heading.addEventListener('mouseleave', () => {
        heading.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
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

// 3D Effect for Mission Stats
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// 3D Effect for Values Cards
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Add 3D Shine Effect to Cards
document.querySelectorAll('.team-member, .stat-card, .value-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const shine = document.createElement('div');
        shine.className = 'shine';
        shine.style.left = `${x}px`;
        shine.style.top = `${y}px`;
        
        card.appendChild(shine);
        
        setTimeout(() => {
            shine.remove();
        }, 1000);
    });
}); 