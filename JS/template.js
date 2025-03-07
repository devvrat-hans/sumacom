document.body.classList.add('preload');

document.addEventListener('DOMContentLoaded', function() {
    fetch('./templates/shared/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navigation-bar').innerHTML = data;
            document.getElementById('navigation-bar').classList.add('loaded');
            updateActiveNavLink();
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Load footer
    fetch('./templates/shared/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
            updateActiveFooterLink();
        })
        .catch(error => console.error('Error loading footer:', error));

    // Remove preload class and add loaded class
    setTimeout(() => {
        document.body.classList.remove('preload');
        document.body.classList.add('loaded');
        document.querySelector('nav').classList.add('loaded');
    }, 100);
});

function updateActiveNavLink() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove all active classes first
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current page link
    const activeLink = document.querySelector(`.nav-links a[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function updateActiveFooterLink() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove all active classes first
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current page link
    const activeLink = document.querySelector(`.footer-links a[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}