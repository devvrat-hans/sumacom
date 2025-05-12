document.addEventListener('DOMContentLoaded', function() {
    // Load navbar, footer, and chatbot immediately
    Promise.all([loadNavbar(), loadFooter(), loadChatbot()])
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
            const footer = document.querySelector('footer');
            footer.innerHTML = data;
            updateActiveFooterLink();
        })
        .catch(error => {
            console.error('Footer loading error:', error);
            document.querySelector('footer').innerHTML = '<p>Footer failed to load</p>';
        });
}

function loadChatbot() {
    return fetch('./templates/shared/chatbot.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load chatbot');
            return response.text();
        })
        .then(data => {
            // Create a container for the chatbot if it doesn't exist
            let chatbotContainer = document.getElementById('chatbot-container');
            if (!chatbotContainer) {
                chatbotContainer = document.createElement('div');
                chatbotContainer.id = 'chatbot-container';
                document.body.appendChild(chatbotContainer);
            }
            chatbotContainer.innerHTML = data;
            
            // Initialize chatbot functionality after loading the HTML
            initializeChatbot();
        })
        .catch(error => {
            console.error('Chatbot loading error:', error);
        });
}

function updateActiveNavLink() {
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error updating active nav link:', error);
    }
}

function updateActiveFooterLink() {
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const footerLinks = document.querySelectorAll('.footer-links a');
        
        footerLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error updating active footer link:', error);
    }
}

// Initialize chatbot functionality
function initializeChatbot() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatBox = document.querySelector('.chat-box');
    const closeChat = document.querySelector('.close-chat');
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.getElementById('chat-input-field');
    
    if (!chatToggle || !chatBox || !closeChat || !sendBtn || !chatInput) {
        console.error('Chatbot elements not found');
        return;
    }
    
    // Open chat box when chat toggle is clicked
    chatToggle.addEventListener('click', () => {
        chatBox.classList.add('active');
        // Focus on input field when chat is opened
        setTimeout(() => chatInput.focus(), 300);
    });
    
    // Close chat box when close button is clicked
    closeChat.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });
}

// Add error handling for failed resource loading
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'LINK') {
        console.error('Resource failed to load:', e.target.src || e.target.href);
    }
}, true);