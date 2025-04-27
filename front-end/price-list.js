document.addEventListener('DOMContentLoaded', function() {
    // Animate price cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const priceCategories = document.querySelectorAll('.price-category');
    let delay = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.8s ease-out ${delay}s forwards`;
                delay += 0.2;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    priceCategories.forEach(category => {
        category.style.opacity = '0';
        observer.observe(category);
    });

    // Add hover effect to price cards
    const priceCards = document.querySelectorAll('.price-card');
    
    priceCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const icon = card.querySelector('.card-icon');
            icon.style.transform = 'rotateY(360deg)';
            
            // Add shine effect
            const shine = document.createElement('div');
            shine.classList.add('shine');
            card.appendChild(shine);
            
            setTimeout(() => {
                shine.remove();
            }, 1000);
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Add floating animation to bulk order section
    const bulkContent = document.querySelector('.bulk-content');
    let floatY = 0;
    let floatDirection = 1;

    function animateFloat() {
        floatY += 0.1 * floatDirection;
        
        if (floatY > 10) floatDirection = -1;
        if (floatY < 0) floatDirection = 1;
        
        bulkContent.style.transform = `translateY(${floatY}px)`;
        requestAnimationFrame(animateFloat);
    }

    animateFloat();

    // Add dynamic price update animation
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.addEventListener('mouseenter', () => {
            price.style.transform = 'scale(1.1)';
            price.style.color = 'var(--secondary-green)';
        });

        price.addEventListener('mouseleave', () => {
            price.style.transform = 'scale(1)';
            price.style.color = 'var(--primary-green)';
        });
    });

    // Add CSS for shine effect
    const style = document.createElement('style');
    style.textContent = `
        .shine {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.2),
                transparent
            );
            animation: shine 1s ease-out;
        }

        @keyframes shine {
            to {
                left: 200%;
            }
        }
    `;
    document.head.appendChild(style);
}); 