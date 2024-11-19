// Add search functionality
const searchInput = document.querySelector('.search-bar input');

searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Add search logic here if needed
    console.log('Searching for:', searchTerm);
});

// Add active state to navigation items
const navItems = document.querySelectorAll('.fixed-bottom .col');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});
