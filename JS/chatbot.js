// Chatbot functionality for Sumacom website
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatBox = document.querySelector('.chat-box');
    const closeChat = document.querySelector('.close-chat');
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.getElementById('chat-input-field');
    const chatMessages = document.querySelector('.chat-messages');
    
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
    
    // Send message when send button is clicked or Enter key is pressed
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    async function sendMessage() {
        const message = chatInput.value.trim();
        
        // Don't send empty messages
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input field
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Send message to n8n webhook and get response
            const botResponse = await sendToWebhook(message);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add bot message to chat
            addMessage(botResponse, 'bot');
        } catch (error) {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Show error message
            addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 'bot');
            console.error("Webhook error:", error);
        }
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    async function sendToWebhook(userMessage) {
        try {
            // Check if webhook config is available
            if (typeof WEBHOOK_CONFIG === 'undefined') {
                console.error("Webhook configuration not found!");
                return "Sorry, the chatbot is not properly configured. Please try again later.";
            }
            
            // Prepare headers
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            
            // Add basic authentication if credentials are provided
            if (WEBHOOK_CONFIG.auth && WEBHOOK_CONFIG.auth.username && WEBHOOK_CONFIG.auth.password) {
                const authString = `${WEBHOOK_CONFIG.auth.username}:${WEBHOOK_CONFIG.auth.password}`;
                const base64Auth = btoa(authString);
                headers.append('Authorization', `Basic ${base64Auth}`);
            }
            
            // Prepare request data
            const requestData = {
                message: userMessage,
                timestamp: new Date().toISOString(),
                source: 'sumacom-website',
                pageUrl: window.location.href,
                sessionId: getSessionId(),
                userAgent: navigator.userAgent
            };
            
            console.log("Sending message to webhook:", WEBHOOK_CONFIG.url);
            
            // Send request to webhook
            const response = await fetch(WEBHOOK_CONFIG.url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestData),
                credentials: 'omit' // Don't send cookies
            });
            
            // Check if response is ok
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Parse the response
            try {
                const data = await response.json();
                console.log("Received response from webhook:", data);
                
                // Handle the specific format [{"output":"message text"}]
                if (Array.isArray(data) && data.length > 0 && data[0].output) {
                    // Use the output property from the first item in the array
                    return formatBotResponse(data[0].output);
                }
                // Fallback for other response formats
                else if (data.response) {
                    return formatBotResponse(data.response);
                }
                else if (data.message) {
                    return formatBotResponse(data.message);
                }
                else if (typeof data === 'string') {
                    return formatBotResponse(data);
                }
                else {
                    return "I received your message but couldn't process the response correctly.";
                }
                
            } catch (jsonError) {
                console.error("Error parsing JSON response:", jsonError);
                const textResponse = await response.text();
                if (textResponse && textResponse.trim().length > 0) {
                    return formatBotResponse(textResponse);
                } else {
                    throw new Error("No valid response from webhook");
                }
            }
            
        } catch (error) {
            console.error("Error connecting to webhook:", error);
            return "Sorry, I couldn't connect to my processing service. Please try again later.";
        }
    }
    
    // Format bot's response by converting markdown-style lists to HTML
    function formatBotResponse(text) {
        // Handle line breaks
        text = text.replace(/\n/g, '<br>');
        
        // Handle markdown-style bullet points with HTML formatting
        text = text.replace(/\* (.*?)(?:<br>|$)/g, '• $1<br>');
        
        return text;
    }
    
    // Generate or retrieve a session ID
    function getSessionId() {
        let sessionId = localStorage.getItem('sumacom_chat_session');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('sumacom_chat_session', sessionId);
        }
        return sessionId;
    }
    
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        
        // Use innerHTML for bot messages to allow HTML formatting
        // Use textContent for user messages for security
        if (sender === 'bot') {
            messageElement.innerHTML = message;
        } else {
            messageElement.textContent = message;
        }
        
        chatMessages.appendChild(messageElement);
    }
    
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            typingIndicator.appendChild(dot);
        }
        
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
});

// Add "active" class to body when document is fully loaded
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    if (document.querySelector('#navigation-bar')) {
        document.querySelector('#navigation-bar').classList.add('loaded');
    }
});