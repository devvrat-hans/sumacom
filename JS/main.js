document.addEventListener('DOMContentLoaded', function() {
    // Initialize search functionality
    initializeSearch();
});

document.addEventListener('DOMContentLoaded', function() {
    // Add lazy loading to all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.classList.contains('logo')) { // Don't lazy load logo
            img.loading = 'lazy';
            img.decoding = 'async';
        }
    });
});