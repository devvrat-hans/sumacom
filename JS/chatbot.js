// Chatbot functionality for Sumacom website
document.addEventListener('DOMContentLoaded', function () {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatBox = document.querySelector('.chat-box');
    const closeChat = document.querySelector('.close-chat');
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.getElementById('chat-input-field');
    const chatMessages = document.querySelector('.chat-messages');



    // Define common questions and their responses
    const commonResponses = {

        "hi": "Hello! Welcome to Sumacom Consultancy. How may I assist you today?",
        "hello": "Hello! Welcome to Sumacom Consultancy. How may I assist you today?",
        "hey": "Hello! Welcome to Sumacom Consultancy. How may I assist you today?",
        "good morning": "Good morning! Welcome to Sumacom Consultancy. How can I help you today?",
        "good afternoon": "Good afternoon! Welcome to Sumacom Consultancy. How may I assist you?",
        "good evening": "Good evening! Welcome to Sumacom Consultancy. How can I help you today?",

        "what is sumacom": "Sumacom is a contract-based research consultancy firm dedicated to providing top-notch research services. Our team of experienced professionals is committed to delivering high-quality research and consultancy services to help our clients achieve their goals.",
        "who are you": "We are Sumacom Consultancy, a research firm specializing in chemical engineering, materials science, and process optimization. We work with industrial partners to solve complex challenges and develop innovative solutions.",
        "tell me about sumacom": "Sumacom Consultancy is a research firm founded by researchers from IIT Gandhinagar. We specialize in chemical engineering, materials science, and process optimization, helping companies solve complex challenges through innovative research solutions.",
        "when was sumacom founded": "Sumacom Consultancy Pvt. Ltd. was founded in 2024, bringing together expertise in sustainable manufacturing and eco-friendly innovation.",
        "company size": "Sumacom Consultancy is a small but dynamic team of 2-10 employees dedicated to driving innovation in sustainable manufacturing.",
        "company history": "Founded by researchers from IIT Gandhinagar, Sumacom Consultancy began with a mission to transform waste materials into valuable products. Our journey started with developing sustainable adhesives from waste EPS and has since expanded to various eco-friendly solutions.",

        "what services do you offer": "We offer several key services including: System Optimization for Core Chemical Industries, Patent-Worthy Chemical Formula Development, Chemical Formula Modulations, and comprehensive Testing Services. You can learn more on our Services page.",
        "what services": "Our core services include System Optimization, Chemical Formula Development, Formula Modulations, and Testing Services. Visit our Services page for more details.",
        "sustainable solutions": "Our sustainable solutions focus on transforming waste EPS (Expanded Polystyrene) into high-performance, eco-friendly adhesives using plant-based solvents. This approach addresses environmental challenges while providing effective industrial products.",
        "adhesive products": "We specialize in developing sustainable adhesives that utilize waste EPS and natural solvents. Our adhesives offer strong bonding properties without the harmful chemicals found in traditional products.",
        "research capabilities": "Our research capabilities span chemical engineering, materials science, and sustainable manufacturing. We leverage cutting-edge techniques to develop eco-friendly solutions that address real-world challenges.",
        "consulting services": "Our consulting services include sustainability assessments, process optimization, material selection guidance, and custom research solutions tailored to your specific industry needs.",
        "testing facilities": "We provide comprehensive testing services for adhesives, materials, and chemical formulations at our facilities in IIT Gandhinagar, ensuring quality and performance meet industry standards.",

        "sustainability initiatives": "Our primary sustainability initiative involves transforming non-biodegradable waste EPS into valuable adhesives, reducing landfill waste while creating high-performance products. We're committed to promoting a circular economy through innovative recycling solutions.",
        "environmental impact": "By repurposing waste EPS and using plant-based solvents, our processes significantly reduce environmental impact compared to traditional adhesive manufacturing. We help businesses lower their carbon footprint while meeting performance requirements.",
        "circular economy": "We're dedicated to promoting circular economy principles by transforming waste into value. Our processes create a closed-loop system where today's waste becomes tomorrow's resources, reducing the need for new raw materials.",
        "innovation approach": "Our innovation approach combines research excellence from IIT Gandhinagar with practical industrial applications. We focus on developing solutions that are not just scientifically sound but also commercially viable and environmentally responsible.",
        "technology": "Our proprietary technology allows us to transform waste EPS using plant-based solvents, creating adhesives with strong performance characteristics while eliminating the need for harmful chemicals typically used in adhesive production.",

        "industries you serve": "We serve multiple industries including manufacturing, packaging, construction, and any sector looking to improve sustainability in their adhesive applications or waste management processes.",
        "applications": "Our sustainable adhesives can be applied across various industries including packaging, construction, product assembly, and more. We work with clients to tailor solutions to their specific application requirements.",
        "manufacturing partners": "We collaborate with forward-thinking manufacturing partners who share our commitment to sustainability and innovation. Our partnerships focus on integrating eco-friendly practices into existing production processes.",
        "packaging solutions": "For the packaging industry, our sustainable adhesives provide an environmentally responsible alternative that maintains necessary performance characteristics while helping companies meet their sustainability goals.",
        "construction applications": "Our adhesives can be used in various construction applications, providing strong bonding capabilities while supporting green building initiatives and sustainability certifications.",

        "awards": "Sumacom's research has been recognized at Chemference 23, the Undergraduate Research Showcase at IIT Gandhinagar, and Boeing BUILD 3.0 where we were among the top 28 startups nationwide. Our work has also been featured in Gujarati newspapers.",
        "achievements": "Our achievements include developing patent-worthy sustainable adhesive formulations, securing recognition at Boeing's BUILD 3.0 program (top 4 regional finalists), and receiving the 2nd Best Poster Prize at IIT Gandhinagar's Undergraduate Research Showcase.",
        "research publications": "Our team has presented research on environmental remediation and waste EPS repurposing at national conferences including Chemference 23. For a complete list of our publications, please visit our Research page.",
        "certifications": "Our products and processes undergo rigorous testing and certification to ensure they meet industry standards while delivering on our sustainability promises. Details about specific certifications can be provided upon request.",
        "media coverage": "Sumacom's innovative approach to sustainability has been featured in local and regional publications. Our participation in Boeing's BUILD 3.0 program and other achievements have garnered media attention highlighting our commitment to environmental solutions.",

        "who are the founders": "Sumacom was founded by three individuals: Jinious Sheth (Materials Engineering, IIT Gandhinagar), Rahul Pandey (Chemical Engineering, IIT Gandhinagar), and Devvrat Hans (Computer Science, IIT Gandhinagar).",
        "your team": "Our team comprises experts in chemical engineering, materials science, and sustainable manufacturing from IIT Gandhinagar. This interdisciplinary approach allows us to tackle complex challenges with innovative solutions.",
        "expertise": "Our core expertise lies in sustainable adhesives, waste material repurposing, chemical formula development, and eco-friendly manufacturing processes. We combine academic research excellence with practical industrial applications.",
        "leadership": "Sumacom's leadership team brings together diverse expertise in materials engineering, chemical engineering, and computer science, creating a powerful combination for driving innovation in sustainable manufacturing.",
        "research background": "Our team has strong research backgrounds from IIT Gandhinagar, with specializations in materials science, chemical engineering, and sustainable manufacturing processes.",

        "partnership opportunities": "We offer various partnership opportunities for businesses interested in sustainable manufacturing, waste reduction, or eco-friendly adhesives. Our collaborative approach focuses on creating shared value and environmental impact.",
        "how to collaborate": "Collaboration with Sumacom can take many forms, from integrating our sustainable adhesives into your operations to joint innovation projects or knowledge sharing initiatives. Contact us to discuss potential collaboration opportunities.",
        "become a partner": "To explore partnership opportunities with Sumacom, please contact us at sumacom.business@gmail.com. We're always looking for forward-thinking organizations that share our commitment to sustainability and innovation.",
        "research collaboration": "We welcome research collaborations with academic institutions, industry partners, and research organizations. Our team can work with you to develop joint research initiatives focused on sustainable manufacturing and materials science.",
        "distributor information": "If you're interested in distributing our sustainable adhesive products, please contact our business development team at sumacom.business@gmail.com for information about our distribution program.",

        "where are you located": "Our head office is located at Research Park, IIEC, IIT Gandhinagar, Palaj, 382355.",
        "contact information": "You can reach us via email at sumacom.business@gmail.com or call us at +91 6352 847 062 (Jinious Sheth) or +91 93698 11105 (Rahul Pandey). Our office is at Research Park, IIEC, IIT Gandhinagar.",
        "how can i contact you": "You can contact us through email at sumacom.business@gmail.com, by phone at +91 6352 847 062, or by using the contact form on our Contact page.",
        "office hours": "Our office is open Monday through Friday from 9:00 AM to 5:30 PM IST. You can reach our team during these hours for inquiries or support.",
        "visit us": "We welcome visitors to our facility at Research Park, IIEC, IIT Gandhinagar. Please schedule an appointment in advance by contacting us at sumacom.business@gmail.com.",
        "website": "You can find more information about our services, solutions, and team on our website: sumcomconsultancy.com",

        "job openings": "Currently, we don't have any open positions. However, you can still submit your resume for future opportunities. Please check our Careers page for updates.",
        "careers": "We don't have any open positions at the moment, but we encourage you to submit your resume for future opportunities. Visit our Careers page for more information.",
        "internship opportunities": "We offer internships for students in chemical engineering, materials science, and related fields. While we may not have current openings, you can submit your resume for consideration when opportunities arise.",
        "working at sumacom": "Working at Sumacom means being part of a dynamic team dedicated to sustainable innovation. We foster a collaborative environment where creativity and problem-solving are valued and encouraged.",
        "application process": "Our application process typically includes resume screening, technical interviews, and a final discussion with the founding team. We look for candidates who share our passion for sustainability and innovation.",

        "help": "I can help you learn about Sumacom's services, projects, team members, or contact information. What would you like to know about?",
        "faq": "You can find answers to frequently asked questions on our FAQ page. If you don't find what you're looking for, please contact us directly.",
        "technical support": "For technical support regarding our products or services, please email support@sumcomconsultancy.com with details about your inquiry. Our technical team will respond within 24 business hours.",
        "product information": "For detailed product information, please visit our Products page or contact us directly for specifications, application guides, and safety data sheets.",
        "shipping information": "For information about shipping options, costs, and delivery times, please visit our Shipping Information page or contact our customer service team.",

        "get a quote": "To request a quote for our services or products, please fill out the quote request form on our website or email us at sumacom.business@gmail.com with details about your requirements.",
        "project consultation": "We offer complimentary initial consultations to discuss your project needs and how our solutions might help. Contact us at sumacom.business@gmail.com to schedule a consultation.",
        "bulk orders": "We provide competitive pricing for bulk orders of our sustainable adhesive products. Please contact our sales team at sumacom.business@gmail.com for more information.",
        "custom solutions": "We develop custom solutions tailored to specific industry challenges. If you have unique requirements, contact us to discuss how we can create a specialized formula or process for your needs.",
        "investment opportunities": "For information about investment opportunities in Sumacom Consultancy, please contact our founders directly at sumacom.business@gmail.com.",

        "case studies": "Our case studies showcase how our sustainable solutions have helped businesses across various industries reduce environmental impact while maintaining product performance. Visit our Case Studies page to learn more.",
        "success stories": "We're proud of the success stories we've created with our clients. From reducing waste to improving product performance, our collaborative approach has delivered meaningful results across various industries.",
        "client testimonials": "Our clients appreciate our innovative approach, technical expertise, and commitment to sustainability. Visit our Testimonials page to read what they have to say about working with Sumacom.",
        "project outcomes": "Our projects typically result in reduced environmental impact, improved product performance, and cost savings. Each client engagement is unique, and we measure success based on the specific goals established at the outset.",
        "implementation examples": "We've successfully implemented our sustainable adhesive solutions across various applications, from packaging to construction. Each implementation is tailored to the client's specific needs and industry requirements.",

        "project timelines": "Our typical project timelines range from 4-12 weeks, depending on complexity. For sustainable adhesive formulations, we usually require 8-10 weeks for R&D and testing. Visit our Projects page for case studies or email sumcom.business@gmail.com for a detailed timeline.",

        "technical specifications": "Technical specifications for our products are available in the Resources section. For customized formulations like UF Resin or Barrier Layer Emulsions, contact our technical team at sumcom.business@gmail.com.",

        "collaboration process": "Our collaboration process involves: 1) Initial consultation, 2) NDA signing, 3) Project scoping, and 4) Milestone-based delivery. Schedule a free consultation by emailing sumcom.business@gmail.com.",

        "order status": "To check your order status, please provide your 6-digit order ID by emailing sumcom.business@gmail.com. For bulk orders or logistics support, just mention your project details in your email.",

        "document requests": "You can request SDS (Safety Data Sheets) and technical whitepapers by emailing sumcom.business@gmail.com. For proprietary research documents, please include your project code in your request.",

        "escalate to human": "I’ll connect you with a specialist. While you wait, here’s a summary of your query: [Recap]. Our team will respond within 15 minutes during business hours. For urgent matters, email sumcom.business@gmail.com.",

        "pricing inquiry": "Pricing varies based on project scope. For standard services like Chemical Formula Modulations, costs start at ₹1,50,000. Request a customized quote by emailing sumcom.business@gmail.com.",

        "feedback submission": "We value your input! Share feedback by emailing sumcom.business@gmail.com with the subject 'Feedback'. For urgent concerns, please mention 'Urgent' in your email subject.",

        "certifications": "We hold ISO 9001:2025 for quality management and ISO 14001 for environmental compliance. To request our certificates, email sumcom.business@gmail.com.",

        "sustainability metrics": "Our sustainable adhesives reduce carbon footprint by 40% compared to traditional solutions. Request our 2024 Sustainability Report by emailing sumcom.business@gmail.com.",

        "payment methods": "We accept bank transfers, UPI, and corporate credit cards. For government projects, GST-compliant invoices are provided. For payment-related questions, email sumcom.business@gmail.com.",

        "cancellation policy": "Projects can be cancelled within 7 days with a 10% administrative fee. For details, refer to Clause 4.2 in your contract or email sumcom.business@gmail.com.",

        "emergency support": "For urgent support or emergencies, please email sumcom.business@gmail.com with 'Urgent' in the subject line. Our team will respond as quickly as possible.",

        "training programs": "We offer quarterly workshops on Advanced Polymer Synthesis and Waste Textile Recycling. For the latest schedule or to register, email sumcom.business@gmail.com.",

        "website issues": "To report website bugs or access issues, email sumcom.business@gmail.com. For urgent matters, mention 'Website Issue' in the subject.",

        "media inquiries": "For all media or press inquiries, contact our PR team at sumcom.business@gmail.com. You can request our press kit or schedule interviews through the same email.",

        "partnership criteria": "We partner with organizations aligned with SDG 9 (Industry Innovation). To propose a partnership, email your proposal to sumcom.business@gmail.com. Evaluation typically takes 2-3 weeks.",

        "confidentiality": "All interactions are protected under our ISO 27001-certified data security protocols. To request our NDA template or learn more, email sumcom.business@gmail.com.",

        "out of scope": "I specialize in chemical engineering and materials science queries. For HR, financial, or other inquiries, please email sumcom.business@gmail.com.",

        "negative feedback": "We apologize for the inconvenience. Our quality team will investigate this. Please share details at sumcom.business@gmail.com. We aim to resolve all issues within 48 hours.",


        "what makes your adhesive ecofriendly": "Our adhesive is made by recycling non-biodegradable waste Expanded Polystyrene (EPS) using plant-based solvents, reducing landfill waste and the need for harmful chemicals. This helps your business lower its environmental footprint and supports a circular economy.",

        "how is your adhesive different from fevicol or bluecoat": "Unlike traditional adhesives like Fevicol MR or Bluecoat, our adhesive is made from recycled EPS waste, delivers higher tensile strength (200-250 kPa), and is compatible with a wider range of surfaces including plywood, paper, plastic, and fabrics-all while being more environmentally friendly[2].",

        "can i get a sample": "Yes, we provide samples for industrial evaluation. Please email your company details and application requirements to sumcom.business@gmail.com. Our team will get in touch to arrange delivery.",

        "do you support epr compliance": "Absolutely! Our adhesives are designed to help manufacturers meet Extended Producer Responsibility (EPR) requirements by using recycled materials and supporting sustainable business practices[2].",

        "what industries do you serve": "We work with manufacturing, packaging, construction, and other sectors seeking sustainable, high-performance adhesives and process optimization[1][2].",

        "how do i start a project with you": "To start a project, email your requirements to sumcom.business@gmail.com. We’ll schedule a consultation to understand your needs and propose a tailored solution.",

        "what is your company mission": "Sumcom Consultancy aims to revolutionize the adhesive industry by transforming waste into value, driving sustainability, and helping businesses achieve their environmental goals[2].",

        "what is epr": "Extended Producer Responsibility (EPR) is a framework that holds manufacturers accountable for the entire lifecycle of their products, including post-consumer waste. Our products are designed to help you meet EPR compliance easily[2].",

        "can you help with sustainability certification": "Yes, we can provide documentation and support for sustainability certifications related to our products. Please email sumcom.business@gmail.com with your specific requirements.",

        "what are your business hours": "Our team is available Monday to Friday, 9:00 AM to 5:30 PM IST. You can email us at sumcom.business@gmail.com anytime, and we’ll respond during business hours.",

        "do you offer bulk order discounts": "Yes, we offer competitive pricing and discounts for bulk orders. Please email your requirements to sumcom.business@gmail.com for a custom quote.",

        "how do i track my order": "To track your order, email your order ID and details to sumcom.business@gmail.com. We’ll provide you with the latest status update.",

        "do you offer training or workshops": "We periodically conduct workshops on sustainable adhesives, process optimization, and waste management. For the next schedule or to request a session, email sumcom.business@gmail.com.",

        "can you develop custom adhesives": "Yes, we specialize in developing custom adhesive formulations based on your application needs. Email your requirements to sumcom.business@gmail.com to get started.",

        "how do i request technical support": "For technical support, email your query and any relevant details to sumcom.business@gmail.com. Our experts will assist you as soon as possible.",

        "how do i give feedback": "We welcome your feedback! Please email your comments or suggestions to sumcom.business@gmail.com with the subject 'Feedback'.",

        "how do i become a partner": "To explore partnership opportunities, email your proposal or interest to sumcom.business@gmail.com. We welcome collaborations with businesses focused on sustainability and innovation.",

        "do you have any ongoing research collaborations": "Yes, we regularly collaborate with academic and industry partners on sustainable materials and chemical engineering projects. If you’re interested in collaborating, email sumcom.business@gmail.com.",

        "can i visit your facility": "Visits to our facility at IIT Gandhinagar are by appointment only. Email sumcom.business@gmail.com to schedule a visit.",

        "where can i find your awards and recognition": "You can view our awards and recognitions, including Chemference 23 and Boeing BUILD 3.0 achievements, on the Awards page of our website or by requesting details at sumcom.business@gmail.com[3].",

        "who are the founders": "Sumcom Consultancy was founded by Jinious Sheth, Rahul Pandey, and Devvrat Hans-researchers from IIT Gandhinagar with expertise in materials engineering, chemical engineering, and computer science[6].",

        "do you have a brochure": "Yes, we can share our latest company brochure and product datasheets. Please request them by emailing sumcom.business@gmail.com.",

        "how do i unsubscribe from emails": "To unsubscribe from our communications, reply to any email from us with 'Unsubscribe' in the subject or email sumcom.business@gmail.com with your request.",

        "what is your unique selling point": "Our unique selling point is transforming non-biodegradable waste EPS into high-performance, eco-friendly adhesives using plant-based solvents. This not only reduces landfill waste but also helps our partners meet their sustainability and EPR goals[2].",

        "do you offer consulting for process optimization": "Yes, we offer consulting services for process optimization in chemical engineering and materials science. To discuss your process challenges, email sumcom.business@gmail.com.",

        "can you help us meet our sustainability targets": "Absolutely! Our sustainable adhesive solutions and research-backed consulting can help your organization achieve its sustainability and regulatory targets. Contact sumcom.business@gmail.com to learn more.",

        "how do i request a product demo": "To request a demo of our sustainable adhesive or other solutions, please email sumcom.business@gmail.com with your company name and application details. Our team will arrange a suitable time.",

        "do you provide msds or safety data sheets": "Yes, we provide Material Safety Data Sheets (MSDS) and other compliance documentation for all our products. Please email sumcom.business@gmail.com to request the documents you need.",

        "what is your refund policy": "Refunds are handled on a case-by-case basis according to project agreements. For specific refund or cancellation inquiries, please contact sumcom.business@gmail.com.",

        "how do i update my contact or company information": "To update your contact or company information in our records, email the new details to sumcom.business@gmail.com.",

        "can i get a certificate of analysis": "Yes, we can provide a Certificate of Analysis for our adhesive and other chemical products. Please email your request and order details to sumcom.business@gmail.com.",

        "do you support startups or student projects": "We are passionate about supporting innovation! If you are a startup or student team interested in sustainable adhesives or chemical engineering projects, email us at sumcom.business@gmail.com for possible collaboration.",

        "how do i apply for an internship": "To apply for internships, send your resume and a brief cover letter to sumcom.business@gmail.com. We’ll contact you if a suitable opportunity arises.",

        "can you help with grant applications": "Yes, we can provide technical documentation and letters of support for grant applications involving sustainability and materials science. Email sumcom.business@gmail.com with your requirements.",

        "do you have a newsletter": "Yes, we share updates about our research, achievements, and sustainability insights. Email sumcom.business@gmail.com with 'Subscribe' in the subject to join our newsletter list.",

        "how do i schedule a call": "To schedule a call or virtual meeting with our team, email your preferred date and time to sumcom.business@gmail.com. We’ll confirm your slot as soon as possible.",

        "do you have case studies": "We have several case studies demonstrating the impact of our sustainable adhesives and consulting services. Request case studies by emailing sumcom.business@gmail.com.",

        "can i request a site visit or audit": "Yes, we offer on-site visits and sustainability audits for industrial partners. To request a visit, email sumcom.business@gmail.com with your location and requirements.",

        "what are your payment terms": "Our standard payment terms are 50% advance and 50% upon delivery for most projects. For custom terms or clarifications, please email sumcom.business@gmail.com.",

        "how do i report a quality issue": "To report a product or service quality issue, email sumcom.business@gmail.com with your order details and a description of the problem. Our team will respond promptly.",

        "do you have references or testimonials": "Yes, we can provide references and client testimonials upon request. Email sumcom.business@gmail.com to request them.",

        "how do i become a distributor": "If you are interested in distributing our sustainable adhesive products, email sumcom.business@gmail.com with your company profile and region of interest.",

        "can you help with regulatory compliance": "Yes, our team can guide you on regulatory compliance for adhesives and chemical products, including EPR and sustainability certifications. Email sumcom.business@gmail.com for support.",

        "do you have a privacy policy": "Yes, we are committed to protecting your data. To request our privacy policy or learn more about our data protection practices, email sumcom.business@gmail.com."

    };

    // Function to check if user message matches any common questions
    function getCommonResponse(message) {
        const normalizedMessage = message.toLowerCase().trim();

        // Check for exact matches
        if (commonResponses[normalizedMessage]) {
            return commonResponses[normalizedMessage];
        }

        // Check for partial matches - if the user's message contains a key phrase
        for (const [key, response] of Object.entries(commonResponses)) {
            if (normalizedMessage.includes(key)) {
                return response;
            }
        }

        // No match found
        return null;
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

        // First check if we have a pre-defined response for this message
        const commonResponse = getCommonResponse(message);

        if (commonResponse) {
            // Use the pre-defined response without making an API call
            addMessage(commonResponse, 'bot');
        } else {
            // No pre-defined response found, use the API

            // Show typing indicator
            showTypingIndicator();

            try {
                // Send message to our secure proxy
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
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    if (document.querySelector('#navigation-bar')) {
        document.querySelector('#navigation-bar').classList.add('loaded');
    }
});