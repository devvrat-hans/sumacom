document.addEventListener('DOMContentLoaded', function() {
    // Load navbar and footer immediately
    Promise.all([loadNavbar(), loadFooter()])
        .then(() => {
            // Remove preload class after all content is loaded
            setTimeout(() => {
                document.body.classList.remove('preload');
                document.body.classList.add('loaded');
            }, 50);
        })
        .catch(error => console.error('Error loading components:', error));
});

function loadNavbar() {
    return fetch('./templates/shared/navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load navbar');
            return response.text();
        })
        .then(data => {
            const navBar = document.getElementById('navigation-bar');
            navBar.innerHTML = data;
            navBar.classList.add('loaded');
            
            // Initialize nav immediately
            const nav = document.querySelector('nav');
            if (nav) {
                nav.style.opacity = '1';
                nav.classList.add('loaded');
            }
            
            // Add hamburger functionality
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
            
            updateActiveNavLink();
        })
        .catch(error => {
            console.error('Navbar loading error:', error);
            document.getElementById('navigation-bar').innerHTML = '<p>Navigation failed to load</p>';
        });
}

function loadFooter() {
    return fetch('./templates/shared/footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load footer');
            return response.text();
        })
        .then(data => {
            const footer = document.querySelector('footer') || document.querySelector('#main-footer');
            if (footer) {
                footer.innerHTML = data;
                // Make sure footer is visible
                footer.style.display = 'block';
                footer.style.visibility = 'visible';
                footer.style.opacity = '1';
                updateActiveFooterLink();
                console.log('Footer loaded successfully');
            } else {
                console.error('Footer element not found in the document');
            }
        })
        .catch(error => {
            console.error('Footer loading error:', error);
            const footer = document.querySelector('footer');
            if (footer) {
                footer.innerHTML = '<p>Footer failed to load</p>';
            }
        });
}

function updateActiveNavLink() {
    try {
        // Get the current page path, handling both local and production cases
        let currentPage = window.location.pathname;
        
        // Extract just the filename from the path
        currentPage = currentPage.split('/').pop() || 'index.html';
        
        // Handle case when URL doesn't have a file extension (clean URLs)
        if (!currentPage.includes('.')) {
            // If no extension, add .html for comparison or handle root url
            currentPage = currentPage === '' ? 'index.html' : currentPage + '.html';
        }
        
        // Log for debugging
        console.log('Current page detected as:', currentPage);
        
        // Get all navigation links
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Remove active class from all links first
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Find the matching link and add active class
        navLinks.forEach(link => {
            // Get the href attribute
            const href = link.getAttribute('href');
            
            // Compare with current page, handling both formats
            if (href === currentPage || 
                href === currentPage.replace('.html', '') ||
                (currentPage === 'index.html' && (href === '/' || href === '' || href === '#'))) {
                link.classList.add('active');
                console.log('Setting active link:', href);
            }
        });
    } catch (error) {
        console.error('Error updating active nav link:', error);
    }
}

function updateActiveFooterLink() {
    try {
        // Get the current page path, handling both local and production cases
        let currentPage = window.location.pathname;
        
        // Extract just the filename from the path
        currentPage = currentPage.split('/').pop() || 'index.html';
        
        // Handle case when URL doesn't have a file extension (clean URLs)
        if (!currentPage.includes('.')) {
            // If no extension, add .html for comparison or handle root url
            currentPage = currentPage === '' ? 'index.html' : currentPage + '.html';
        }
        
        // Get all footer links
        const footerLinks = document.querySelectorAll('.footer-links a');
        
        // Remove active class from all links
        footerLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Find the matching link and add active class
        footerLinks.forEach(link => {
            // Get the href attribute
            const href = link.getAttribute('href');
            
            // Compare with current page, handling both formats
            if (href === currentPage || 
                href === currentPage.replace('.html', '') ||
                (currentPage === 'index.html' && (href === '/' || href === '' || href === '#'))) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error updating active footer link:', error);
    }
}

// Add error handling for failed resource loading
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'LINK') {
        console.error('Resource failed to load:', e.target.src || e.target.href);
    }
}, true);