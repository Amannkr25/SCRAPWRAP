// 3D Card Effect for Feedback Box
const feedbackBox = document.querySelector('.feedback-box');

document.addEventListener('mousemove', (e) => {
    const rect = feedbackBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    feedbackBox.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
});

document.addEventListener('mouseleave', () => {
    feedbackBox.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
});

// Rating Stars Effect
const ratingStars = document.querySelectorAll('.rating-stars i');
let selectedRating = 0;

ratingStars.forEach(star => {
    star.addEventListener('mouseover', () => {
        const rating = parseInt(star.dataset.rating);
        highlightStars(rating);
    });
    
    star.addEventListener('mouseout', () => {
        highlightStars(selectedRating);
    });
    
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.rating);
        highlightStars(selectedRating);
    });
});

function highlightStars(rating) {
    ratingStars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= rating) {
            star.classList.add('active');
            star.style.transform = 'translateZ(20px) scale(1.2)';
        } else {
            star.classList.remove('active');
            star.style.transform = 'translateZ(10px) scale(1)';
        }
    });
}

// Category Cards Effect
const categoryCards = document.querySelectorAll('.category-card');
let selectedCategory = null;

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('selected')) {
            card.style.transform = 'translateZ(20px) scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('selected')) {
            card.style.transform = 'translateZ(10px) scale(1)';
        }
    });
    
    card.addEventListener('click', () => {
        categoryCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedCategory = card.dataset.category;
    });
});

// File Upload Effect
const uploadBox = document.querySelector('.upload-box');
const fileUpload = document.getElementById('file-upload');
const filePreview = document.querySelector('.file-preview');

uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.style.transform = 'translateZ(20px)';
    uploadBox.style.borderColor = '#2ecc71';
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.style.transform = 'translateZ(10px)';
    uploadBox.style.borderColor = '#ddd';
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.style.transform = 'translateZ(10px)';
    uploadBox.style.borderColor = '#ddd';
    
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileUpload.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.size <= 5 * 1024 * 1024) { // 5MB limit
            const fileItem = createFileItem(file);
            filePreview.appendChild(fileItem);
        } else {
            showError('File size exceeds 5MB limit');
        }
    });
}

function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.style.transform = 'translateZ(10px)';
    
    const icon = document.createElement('i');
    icon.className = getFileIcon(file.type);
    
    const name = document.createElement('span');
    name.textContent = file.name;
    
    const removeBtn = document.createElement('i');
    removeBtn.className = 'fas fa-times';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.marginLeft = 'auto';
    
    removeBtn.addEventListener('click', () => {
        fileItem.style.transform = 'translateZ(-20px)';
        fileItem.style.opacity = '0';
        setTimeout(() => fileItem.remove(), 300);
    });
    
    fileItem.appendChild(icon);
    fileItem.appendChild(name);
    fileItem.appendChild(removeBtn);
    
    return fileItem;
}

function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) return 'fas fa-image';
    if (fileType.startsWith('video/')) return 'fas fa-video';
    if (fileType.startsWith('audio/')) return 'fas fa-music';
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('word')) return 'fas fa-file-word';
    if (fileType.includes('excel')) return 'fas fa-file-excel';
    return 'fas fa-file';
}

// Form Submission with 3D Animation
const feedbackForm = document.getElementById('feedback-form');

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!selectedRating) {
        showError('Please select a rating');
        return;
    }
    
    if (!selectedCategory) {
        showError('Please select a category');
        return;
    }
    
    // Get form data
    const formData = new FormData(feedbackForm);
    formData.append('rating', selectedRating);
    formData.append('category', selectedCategory);
    
    // Create success message with 3D effect
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thank you for your feedback!</span>
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
    const formElements = feedbackForm.elements;
    Array.from(formElements).forEach(element => {
        element.style.transform = 'translateZ(-20px)';
        element.style.opacity = '0';
        setTimeout(() => {
            element.value = '';
            element.style.transform = 'translateZ(0)';
            element.style.opacity = '1';
        }, 300);
    });
    
    // Reset rating and category
    selectedRating = 0;
    selectedCategory = null;
    highlightStars(0);
    categoryCards.forEach(card => card.classList.remove('selected'));
    
    // Clear file preview
    filePreview.innerHTML = '';
});

// Error Message with 3D Effect
function showError(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'success-message';
    errorMessage.style.background = '#e74c3c';
    errorMessage.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(errorMessage);
    
    setTimeout(() => {
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
            setTimeout(() => {
                errorMessage.remove();
            }, 500);
        }, 3000);
    }, 100);
}

// 3D Effect for Form Elements
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

// 3D Parallax Effect for Background
document.addEventListener('mousemove', (e) => {
    const feedbackPage = document.querySelector('.feedback-page');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    feedbackPage.style.backgroundPosition = `${mouseX * 50}% ${mouseY * 50}%`;
});

// Add 3D Shine Effect to Feedback Box
feedbackBox.addEventListener('mousemove', (e) => {
    const rect = feedbackBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const shine = document.createElement('div');
    shine.className = 'shine';
    shine.style.left = `${x}px`;
    shine.style.top = `${y}px`;
    
    feedbackBox.appendChild(shine);
    
    setTimeout(() => {
        shine.remove();
    }, 1000);
}); 