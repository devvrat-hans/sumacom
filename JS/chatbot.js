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
            // Send message to our secure proxy instead of directly to Pinecone API
            const botResponse = await sendToChatProxy(message);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add bot message to chat
            addMessage(botResponse, 'bot');
        } catch (error) {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Show error message
            addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 'bot');
            console.error("API error:", error);
        }
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    async function sendToChatProxy(userMessage) {
        try {
            // Check if config is available
            if (typeof CHATBOT_CONFIG === 'undefined') {
                console.error("Chatbot configuration not found!");
                return "Sorry, the chatbot is not properly configured. Please try again later.";
            }
            
            // Send request to our secure proxy instead of directly to Pinecone
            const response = await fetch(CHATBOT_CONFIG.proxyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage
                })
            });
            
            // Check if response is ok
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Parse the response
            const data = await response.json();
            console.log("API response:", data);
            
            // Extract the correct assistant's message from the response
            if (data && data.message && data.message.content) {
                return formatBotResponse(data.message.content);
            } 
            // Alternative format that might be returned
            else if (data && data.choices && data.choices.length > 0) {
                const message = data.choices[0].message;
                if (message && message.content) {
                    return formatBotResponse(message.content);
                }
            }
            
            console.error("Unexpected response format:", data);
            return "I'm currently experiencing issues processing responses. Please try again later.";
        } catch (error) {
            console.error("Error with chat API:", error);
            return "Sorry, I couldn't connect to the chat service. Please try again later.";
        }
    }
    
    // Format bot's response by converting markdown-style formatting to HTML
    function formatBotResponse(text) {
        if (!text) return '';
        
        // Handle line breaks
        text = text.replace(/\n/g, '<br>');
        
        // Handle numbered lists (1. Item)
        text = text.replace(/(\d+\.)\s(.*?)(?:<br>|$)/g, '<ol start="$1"><li>$2</li></ol>');
        
        // Handle markdown-style bullet points
        text = text.replace(/\* (.*?)(?:<br>|$)/g, '• $1<br>');
        
        // Handle bold text (**text**)
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Handle italic text (*text*)
        text = text.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
        
        // Handle links [text](url)
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Handle headers (### Header)
        text = text.replace(/###\s(.*?)(?:<br>|$)/g, '<h3>$1</h3>');
        text = text.replace(/##\s(.*?)(?:<br>|$)/g, '<h2>$1</h2>');
        text = text.replace(/#\s(.*?)(?:<br>|$)/g, '<h1>$1</h1>');
        
        return text;
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