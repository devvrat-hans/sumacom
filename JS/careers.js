document.addEventListener('DOMContentLoaded', function() {
    const applicationForm = document.getElementById('application-form');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Collect form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const position = document.getElementById('position').value;
            const coverLetter = document.getElementById('cover-letter').value;
            
            // Create mailto link with application information
            const mailtoLink = `mailto:sumacom.business@gmail.com?subject=Job Application for ${encodeURIComponent(position)}&body=Name: ${encodeURIComponent(name)}%0A%0AEmail: ${encodeURIComponent(email)}%0A%0APhone: ${encodeURIComponent(phone)}%0A%0APosition: ${encodeURIComponent(position)}%0A%0ACover Letter:%0A${encodeURIComponent(coverLetter)}%0A%0A(Note: Resume file could not be attached automatically. Please send your resume as a separate email attachment.)`;
            
            // Open user's email client with pre-populated email
            window.location.href = mailtoLink;
            
            // Show alert about resume attachment
            alert('Your application email has been generated. Please attach your resume to the email before sending it. Thank you for your interest in working with Sumacom!');
        });
    }
    
    // Add click handler for all "Apply Now" buttons
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Smooth scroll to application form
            event.preventDefault();
            const applySection = document.getElementById('apply-now');
            if (applySection) {
                applySection.scrollIntoView({ behavior: 'smooth' });
                
                // Auto-select the position in the dropdown
                const positionTitle = this.closest('.position-card').querySelector('h4').textContent;
                const positionSelect = document.getElementById('position');
                
                // Find and select the matching option
                Array.from(positionSelect.options).forEach(option => {
                    if (option.text.includes(positionTitle)) {
                        positionSelect.value = option.value;
                    }
                });
                
                // Focus on the name field
                document.getElementById('name').focus();
            }
        });
    });
});