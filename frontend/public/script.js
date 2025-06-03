// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formDataDisplay = document.getElementById('formDataDisplay');
    const displayContent = document.getElementById('displayContent');
    const closeDisplay = document.getElementById('closeDisplay');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Validate required fields
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Display form data
            displayFormData(data);
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
        });
    }
    
    function displayFormData(data) {
        if (!displayContent || !formDataDisplay) return;
        
        let html = '<h3>Form Submission Details</h3>';
        
        // Format and display each field
        const fieldLabels = {
            name: 'Full Name',
            email: 'Email Address',
            phone: 'Phone Number',
            company: 'Company Name',
            service: 'Service Interested In',
            message: 'Message'
        };
        
        const serviceOptions = {
            'web-development': 'Web Development',
            'mobile-apps': 'Mobile Apps',
            'cloud-solutions': 'Cloud Solutions',
            'ai-integration': 'AI Integration',
            'consulting': 'Consulting'
        };
        
        for (const [key, value] of Object.entries(data)) {
            if (value && value.trim() !== '') {
                let displayValue = value;
                
                // Format service selection
                if (key === 'service' && serviceOptions[value]) {
                    displayValue = serviceOptions[value];
                }
                
                html += `<p><strong>${fieldLabels[key] || key}:</strong> ${displayValue}</p>`;
            }
        }
        
        // Add timestamp
        const timestamp = new Date().toLocaleString();
        html += `<p><strong>Submitted on:</strong> ${timestamp}</p>`;
        
        displayContent.innerHTML = html;
        formDataDisplay.style.display = 'block';
        
        // Scroll to display section
        formDataDisplay.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close display handler
    if (closeDisplay) {
        closeDisplay.addEventListener('click', function() {
            formDataDisplay.style.display = 'none';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to current page nav link
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Gallery image modal functionality (optional enhancement)
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                cursor: pointer;
            `;
            
            // Create modal image
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close modal on escape key
            const handleEscape = function(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    });
    
    // Form field focus effects
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#0ea5e9';
            this.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#e2e8f0';
            this.style.boxShadow = 'none';
        });
    });
});