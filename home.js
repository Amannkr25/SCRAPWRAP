// Three.js Scene Setup
let scene, camera, renderer, wasteGroup, particles;
const canvas = document.getElementById('hero-canvas');
const logoContainer = document.getElementById('logo-container');

function initThreeJS() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;

    // Create particle system
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;

        colors[i] = Math.random() * 0.5 + 0.5;
        colors[i + 1] = Math.random() * 0.5 + 0.5;
        colors[i + 2] = Math.random() * 0.5 + 0.5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create a group for all waste items
    wasteGroup = new THREE.Group();

    // Create dustbin with more detail
    const dustbinGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
    const dustbinMaterial = new THREE.MeshPhongMaterial({
        color: 0x2ecc71,
        shininess: 50,
        specular: 0x444444
    });
    const dustbin = new THREE.Mesh(dustbinGeometry, dustbinMaterial);
    dustbin.castShadow = true;
    dustbin.receiveShadow = true;
    dustbin.position.y = 0.75;
    wasteGroup.add(dustbin);

    // Add dustbin lid
    const lidGeometry = new THREE.CylinderGeometry(0.52, 0.52, 0.1, 32);
    const lidMaterial = new THREE.MeshPhongMaterial({
        color: 0x27ae60,
        shininess: 30
    });
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    lid.position.y = 1.55;
    lid.castShadow = true;
    wasteGroup.add(lid);

    // Create waste items with more variety
    const wasteItems = [
        { color: 0xff69b4, position: [0.3, 1.8, 0], rotation: [0, Math.PI / 4, 0], type: 'flower' },
        { color: 0x87ceeb, position: [-0.3, 1.6, 0.2], rotation: [0, -Math.PI / 3, 0], type: 'bottle' },
        { color: 0xffd700, position: [0.2, 1.7, -0.2], rotation: [0, Math.PI / 2, 0], type: 'can' },
        { color: 0x8b4513, position: [-0.2, 1.5, 0.1], rotation: [0, -Math.PI / 4, 0], type: 'paper' },
        { color: 0x98fb98, position: [0.4, 1.4, -0.3], rotation: [0, Math.PI / 6, 0], type: 'leaf' }
    ];

    wasteItems.forEach(item => {
        let geometry;
        switch (item.type) {
            case 'flower':
                geometry = new THREE.SphereGeometry(0.2, 16, 16);
                break;
            case 'bottle':
                geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 16);
                break;
            case 'can':
                geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 16);
                break;
            case 'paper':
                geometry = new THREE.BoxGeometry(0.3, 0.3, 0.05);
                break;
            case 'leaf':
                geometry = new THREE.ConeGeometry(0.2, 0.4, 16);
                break;
        }

        const material = new THREE.MeshPhongMaterial({
            color: item.color,
            shininess: 100,
            specular: 0xffffff,
            transparent: item.type === 'bottle',
            opacity: item.type === 'bottle' ? 0.6 : 1
        });

        const wasteItem = new THREE.Mesh(geometry, material);
        wasteItem.position.set(...item.position);
        wasteItem.rotation.set(...item.rotation);
        wasteItem.castShadow = true;
        wasteItem.receiveShadow = true;
        wasteGroup.add(wasteItem);
    });

    // Add ground with texture
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        shininess: 0,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Add colored point lights
    const pointLight1 = new THREE.PointLight(0x2ecc71, 1, 10);
    pointLight1.position.set(-2, 2, -2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3498db, 1, 10);
    pointLight2.position.set(2, 2, 2);
    scene.add(pointLight2);

    // Position camera
    camera.position.set(3, 2, 3);
    camera.lookAt(0, 0, 0);

    // Add waste group to scene
    scene.add(wasteGroup);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate waste items
    if (wasteGroup) {
        wasteGroup.rotation.y += 0.005;
        
        // Animate individual waste items
        wasteGroup.children.forEach((child, index) => {
            if (index > 1) { // Skip the dustbin and lid
                child.rotation.y += 0.01;
                child.position.y = 1.5 + Math.sin(Date.now() * 0.001 + index) * 0.1;
            }
        });
    }

    // Animate particles
    if (particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
    }

    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Enhanced mouse move effect
function onMouseMove(event) {
    if (!wasteGroup || !particles) return;

    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    wasteGroup.rotation.y = mouseX * 0.5;
    wasteGroup.rotation.x = mouseY * 0.2;

    // Add particle movement based on mouse position
    particles.rotation.y += mouseX * 0.001;
    particles.rotation.x += mouseY * 0.001;
}

// Initialize Three.js
initThreeJS();
animate();
window.addEventListener('resize', onWindowResize);
window.addEventListener('mousemove', onMouseMove);

// Text Animation
const animateText = () => {
    const textElements = document.querySelectorAll('.animate-text');
    textElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
};

// Quote Card Animation
const quoteCards = document.querySelectorAll('.quote-card');
quoteCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 300);
});

// Feature Card Hover Effect
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
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

// Stats Counter Animation
const statsSection = document.querySelector('.stats-section');
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;

        const updateStat = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.round(current);
                setTimeout(updateStat, stepTime);
            } else {
                stat.textContent = target;
            }
        };

        updateStat();
    });
};

// Intersection Observer for stats animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateText();
}); 