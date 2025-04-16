document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    const authRequired = document.querySelector('.auth-required');
    const pickupFormContainer = document.getElementById('pickupFormContainer');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');

    if (!userDetails) {
        // User not logged in
        authRequired.style.display = 'block';
        pickupFormContainer.style.display = 'none';
        
        // Update login/register links to include return URL
        const currentUrl = window.location.href;
        loginLink.href = `login.html?returnUrl=${encodeURIComponent(currentUrl)}`;
        registerLink.href = `register.html?returnUrl=${encodeURIComponent(currentUrl)}`;
    } else {
        // User is logged in
        authRequired.style.display = 'none';
        pickupFormContainer.style.display = 'block';
        
        // Update navigation links
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('user_details');
            window.location.href = 'login.html';
        });

        // Pre-fill user details
        document.getElementById('userName').value = userDetails.name;
        document.getElementById('userEmail').value = userDetails.email;
        document.getElementById('userPhone').value = userDetails.phone;
    }

    // Schedule Pickup Form
    const pickupForm = document.getElementById('pickupForm');
    if (pickupForm) {
        pickupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!userDetails) {
                showError('Please login to schedule a pickup');
                return;
            }
            
            // Get form data
            const formData = {
                userId: userDetails.id,
                userName: userDetails.name,
                userEmail: userDetails.email,
                userPhone: userDetails.phone,
                pickupDate: this.querySelector('#pickupDate').value,
                pickupTime: this.querySelector('#pickupTime').value,
                wasteTypes: Array.from(this.querySelectorAll('input[name="wasteType"]:checked')).map(input => input.value),
                wasteWeight: this.querySelector('#wasteWeight').value,
                address: this.querySelector('#address').value,
                landmark: this.querySelector('#landmark').value,
                instructions: this.querySelector('#instructions').value
            };

            // Validate form
            if (!validatePickupForm(formData)) {
                return;
            }

            // Simulate API call
            simulatePickupScheduling(formData);
        });
    }

    // Tracking Form
    const trackingForm = document.getElementById('trackingForm');
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const pickupId = this.querySelector('#pickupId').value.trim();
            
            if (!pickupId) {
                showError('Please enter a valid pickup ID');
                return;
            }

            // Simulate tracking lookup
            simulateTrackingLookup(pickupId);
        });
    }

    // Confirmation Page Functionality
    if (document.querySelector('.confirmation-container')) {
        // Get pickup ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const pickupId = urlParams.get('id');

        if (pickupId) {
            // Get pickup details from localStorage
            const pickupDetails = JSON.parse(localStorage.getItem(`pickup_${pickupId}`));
            const userDetails = JSON.parse(localStorage.getItem('user_details'));

            if (pickupDetails && userDetails) {
                // Update user information
                document.getElementById('userId').textContent = userDetails.id;
                document.getElementById('userName').textContent = userDetails.name;
                document.getElementById('userEmail').textContent = userDetails.email;
                document.getElementById('userPhone').textContent = userDetails.phone;

                // Update pickup details
                document.getElementById('pickupId').textContent = pickupId;
                document.getElementById('pickupDate').textContent = new Date(pickupDetails.pickupDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                document.getElementById('pickupTime').textContent = pickupDetails.pickupTime;
                document.getElementById('wasteTypes').textContent = pickupDetails.wasteTypes.join(', ');
                document.getElementById('wasteWeight').textContent = `${pickupDetails.wasteWeight} kg`;
                document.getElementById('pickupAddress').textContent = pickupDetails.address;
                document.getElementById('pickupLandmark').textContent = pickupDetails.landmark || 'Not specified';
                document.getElementById('pickupInstructions').textContent = pickupDetails.instructions || 'None';

                // Add click handler for track pickup button
                document.getElementById('trackPickup').addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = `track-pickup.html?id=${pickupId}`;
                });
            } else {
                // Show error if pickup details not found
                showError('Pickup details not found. Please try scheduling a new pickup.');
                setTimeout(() => {
                    window.location.href = 'schedule-pickup.html';
                }, 3000);
            }
        } else {
            // Show error if no pickup ID
            showError('Invalid pickup ID. Please try scheduling a new pickup.');
            setTimeout(() => {
                window.location.href = 'schedule-pickup.html';
            }, 3000);
        }
    }

    // Helper Functions
    function validatePickupForm(data) {
        if (!data.pickupDate) {
            showError('Please select a pickup date');
            return false;
        }

        if (!data.pickupTime) {
            showError('Please select a time slot');
            return false;
        }

        if (data.wasteTypes.length === 0) {
            showError('Please select at least one waste type');
            return false;
        }

        if (!data.wasteWeight || data.wasteWeight < 1) {
            showError('Please enter a valid weight');
            return false;
        }

        if (!data.address) {
            showError('Please enter your address');
            return false;
        }

        return true;
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const form = document.querySelector('.pickup-form, .tracking-form');
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
        
        const form = document.querySelector('.pickup-form, .tracking-form');
        const existingMessage = form.querySelector('.success-message');
        
        if (existingMessage) {
            existingMessage.remove();
        }
        
        form.insertBefore(successDiv, form.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    function simulatePickupScheduling(data) {
        showSuccess('Scheduling your pickup...');
        
        // Simulate API call delay
        setTimeout(() => {
            // Generate a random pickup ID
            const pickupId = 'SW' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            
            // Store pickup data in localStorage
            const pickupData = {
                id: pickupId,
                ...data,
                status: 'scheduled',
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem(`pickup_${pickupId}`, JSON.stringify(pickupData));
            
            // Redirect to confirmation page with the pickup ID
            window.location.href = `pickup-confirmation.html?id=${pickupId}`;
        }, 1500);
    }

    function simulateTrackingLookup(pickupId) {
        const trackingResult = document.getElementById('trackingResult');
        if (!trackingResult) return;

        // Show loading state
        trackingResult.innerHTML = '<div class="loading">Loading pickup details...</div>';
        trackingResult.classList.add('active');

        // Simulate API call delay
        setTimeout(() => {
            const pickupData = JSON.parse(localStorage.getItem(`pickup_${pickupId}`));
            
            if (!pickupData) {
                trackingResult.innerHTML = '<div class="error-message">No pickup found with this ID</div>';
                return;
            }

            // Update tracking status based on pickup data
            updateTrackingStatus(pickupData);
        }, 1000);
    }

    function updateTrackingStatus(data) {
        const trackingResult = document.getElementById('trackingResult');
        if (!trackingResult) return;

        // Update status badge
        const statusBadge = trackingResult.querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.className = 'status-badge ' + data.status;
            statusBadge.textContent = data.status.charAt(0).toUpperCase() + data.status.slice(1);
        }

        // Update timeline items
        const timelineItems = trackingResult.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update pickup details
        const detailsGrid = trackingResult.querySelector('.details-grid');
        if (detailsGrid) {
            detailsGrid.innerHTML = `
                <div class="detail-item">
                    <span class="detail-label">Date</span>
                    <span class="detail-value">${new Date(data.pickupDate).toLocaleDateString()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Time Slot</span>
                    <span class="detail-value">${data.pickupTime}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Waste Types</span>
                    <span class="detail-value">${data.wasteTypes.join(', ')}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Estimated Weight</span>
                    <span class="detail-value">${data.wasteWeight} kg</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Address</span>
                    <span class="detail-value">${data.address}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Landmark</span>
                    <span class="detail-value">${data.landmark || 'N/A'}</span>
                </div>
            `;
        }
    }

    // Check for pickup ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const pickupId = urlParams.get('id');
    
    if (pickupId && document.getElementById('trackingForm')) {
        document.getElementById('pickupId').value = pickupId;
        simulateTrackingLookup(pickupId);
    }
}); 