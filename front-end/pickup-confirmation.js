document.addEventListener('DOMContentLoaded', function() {
    // Get pickup details from localStorage
      const userProfile = document.getElementById('userProfile');
            const loginLink = document.getElementById('loginLink');
            const registerLink = document.getElementById('registerLink');
            const logoutBtn = document.getElementById('logoutBtn');
            const userName = document.querySelector('.user-name');

            // Check if user is logged in
            const userDetails = JSON.parse(localStorage.getItem('user_details'));

            if (userDetails) {
                // User is logged in
                userProfile.style.display = 'flex';
                loginLink.style.display = 'none';
                registerLink.style.display = 'none';
                userName.textContent = userDetails.name || 'User';
            } else {
                // User is not logged in
                userProfile.style.display = 'none';
                loginLink.style.display = 'block';
                registerLink.style.display = 'block';
            }

            // Handle logout
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('user_details');
                window.location.href = 'login.html';
            });

            // Update login/register links to include return URL
            const currentUrl = window.location.href;
            loginLink.href = `login.html?returnUrl=${encodeURIComponent(currentUrl)}`;
            registerLink.href = `register.html?returnUrl=${encodeURIComponent(currentUrl)}`;

            // Check if user just logged in
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('loggedIn') === 'true') {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Successfully logged in!</span>
                `;
                document.body.appendChild(successMessage);
                setTimeout(() => {
                    successMessage.classList.add('show');
                }, 100);

                // Remove message after 3 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 3000);
            }
    const pickupDetails = JSON.parse(localStorage.getItem('current_pickup'));
    
    if (pickupDetails) {
        // Update pickup ID
        document.getElementById('pickupId').textContent = pickupDetails.pickupId;
        
        // Update user details
        document.getElementById('confirmationUserName').textContent = pickupDetails.userName;
        document.getElementById('confirmationUserEmail').textContent = pickupDetails.userEmail;
        document.getElementById('confirmationUserPhone').textContent = pickupDetails.userPhone;
        
        // Update pickup details
        document.getElementById('confirmationDate').textContent = new Date(pickupDetails.pickupDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('confirmationTime').textContent = pickupDetails.pickupTime;
        
        // Update waste types
        const wasteTypesContainer = document.getElementById('confirmationWasteTypes');
        wasteTypesContainer.innerHTML = pickupDetails.wasteType.map(type => {
            const icon = getWasteTypeIcon(type);
            return `<span class="waste-type-tag"><i class="${icon}"></i> ${type}</span>`;
        }).join('');
        
        // Update other details
        document.getElementById('confirmationWeight').textContent = `${pickupDetails.quantity} kg`;
        document.getElementById('confirmationAddress').textContent =`${Object.entries(pickupDetails.address).map(entry=>`${entry[0]}: ${entry[1]}\n`).join(" || ")}`;
        document.getElementById('confirmationLandmark').textContent = pickupDetails.address.landmark || 'Not specified';
        document.getElementById('confirmationInstructions').textContent = pickupDetails.specialInstructions || 'None';
        
        // Add track pickup button click handler
        document.getElementById('trackPickupBtn').addEventListener('click', function() {
            window.location.href = `track-pickup.html?id=${pickupDetails.pickupId}`;
        });
    } else {
        // If no pickup details found, redirect back to schedule pickup
        window.location.href = 'schedule-pickup.html';
    }
});

function getWasteTypeIcon(type) {
    const icons = {
        plastic: 'fas fa-bottle-water',
        paper: 'fas fa-file',
        metal: 'fas fa-box',
        glass: 'fas fa-wine-glass',
        organic: 'fas fa-leaf',
        flower: 'fas fa-spa',
        fruits: 'fas fa-apple-alt'
    };
    return icons[type] || 'fas fa-trash';
} 