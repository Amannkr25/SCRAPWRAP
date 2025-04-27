document.addEventListener('DOMContentLoaded', function() {
    // Get pickup details from localStorage
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
        wasteTypesContainer.innerHTML = pickupDetails.wasteTypes.map(type => {
            const icon = getWasteTypeIcon(type);
            return `<span class="waste-type-tag"><i class="${icon}"></i> ${type}</span>`;
        }).join('');
        
        // Update other details
        document.getElementById('confirmationWeight').textContent = `${pickupDetails.wasteWeight} kg`;
        document.getElementById('confirmationAddress').textContent = pickupDetails.address;
        document.getElementById('confirmationLandmark').textContent = pickupDetails.landmark || 'Not specified';
        document.getElementById('confirmationInstructions').textContent = pickupDetails.instructions || 'None';
        
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