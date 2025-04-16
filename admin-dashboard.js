// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // // Category Chart - Bar Chart
    // const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    // new Chart(categoryCtx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Paper', 'Plastic', 'Metal', 'Glass', 'Others'],
    //         datasets: [{
    //             label: 'Collection by Category (kg)',
    //             data: [300, 250, 200, 150, 100],
    //             backgroundColor: [
    //                 'rgba(46, 204, 113, 0.8)',
    //                 'rgba(52, 152, 219, 0.8)',
    //                 'rgba(155, 89, 182, 0.8)',
    //                 'rgba(241, 196, 15, 0.8)',
    //                 'rgba(149, 165, 166, 0.8)'
    //             ],
    //             borderColor: [
    //                 'rgba(46, 204, 113, 1)',
    //                 'rgba(52, 152, 219, 1)',
    //                 'rgba(155, 89, 182, 1)',
    //                 'rgba(241, 196, 15, 1)',
    //                 'rgba(149, 165, 166, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         plugins: {
    //             legend: {
    //                 display: false
    //             },
    //             tooltip: {
    //                 callbacks: {
    //                     label: function(context) {
    //                         return context.parsed.y + ' kg';
    //                     }
    //                 }
    //             }
    //         },
    //         scales: {
    //             y: {
    //                 beginAtZero: true,
    //                 grid: {
    //                     color: 'rgba(0, 0, 0, 0.05)'
    //                 },
    //                 ticks: {
    //                     callback: function(value) {
    //                         return value + ' kg';
    //                     }
    //                 }
    //             },
    //             x: {
    //                 grid: {
    //                     display: false
    //                 }
    //             }
    //         }
    //     }
    // });

    // // Revenue Chart - Bar Chart
    // const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    // new Chart(revenueCtx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //         datasets: [{
    //             label: 'Daily Revenue',
    //             data: [3200, 4100, 3800, 5200, 4800, 6000, 5500],
    //             backgroundColor: 'rgba(46, 204, 113, 0.8)',
    //             borderColor: 'rgba(46, 204, 113, 1)',
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         plugins: {
    //             legend: {
    //                 display: false
    //             },
    //             tooltip: {
    //                 callbacks: {
    //                     label: function(context) {
    //                         return '₹' + context.parsed.y.toLocaleString();
    //                     }
    //                 }
    //             }
    //         },
    //         scales: {
    //             y: {
    //                 beginAtZero: true,
    //                 grid: {
    //                     color: 'rgba(0, 0, 0, 0.05)'
    //                 },
    //                 ticks: {
    //                     callback: function(value) {
    //                         return '₹' + value.toLocaleString();
    //                     }
    //                 }
    //             },
    //             x: {
    //                 grid: {
    //                     display: false
    //                 }
    //             }
    //         }
    //     }
    // });

    // Sidebar Toggle for Mobile
    const sidebar = document.querySelector('.admin-sidebar');
    const mainContent = document.querySelector('.admin-main');

    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    }

    // Add New Pickup Modal
    const addPickupBtn = document.querySelector('.add-btn');
    if (addPickupBtn) {
        addPickupBtn.addEventListener('click', () => {
            // Implement add pickup modal functionality
            alert('Add New Pickup functionality will be implemented here');
        });
    }

    // Table Row Actions
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.currentTarget.classList.contains('edit') ? 'edit' : 'delete';
            const row = e.currentTarget.closest('tr');
            
            if (action === 'edit') {
                // Implement edit functionality
                alert('Edit functionality will be implemented here');
            } else {
                // Implement delete functionality
                if (confirm('Are you sure you want to delete this item?')) {
                    row.remove();
                }
            }
        });
    });

    // Date Filter Change
    const dateFilter = document.querySelector('.date-filter select');
    if (dateFilter) {
        dateFilter.addEventListener('change', (e) => {
            // Implement date filter functionality
            console.log('Selected date filter:', e.target.value);
            // Update charts and tables based on selected date range
        });
    }

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search functionality
            console.log('Searching for:', searchTerm);
            // Filter tables based on search term
        });
    }

    // Notifications
    const notificationsBtn = document.querySelector('.notifications');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', () => {
            // Implement notifications panel
            alert('Notifications panel will be implemented here');
        });
    }

    // Auto-update Stats
    function updateStats() {
        // Simulate real-time updates
        setInterval(() => {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                // Add small random variations to stats
                const currentValue = parseInt(stat.textContent);
                const variation = Math.floor(Math.random() * 10) - 5;
                stat.textContent = currentValue + variation;
            });
        }, 5000);
    }

    // Initialize
    updateStats();
}); 