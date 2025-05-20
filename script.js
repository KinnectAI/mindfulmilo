document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .use-case-card, .testimonial-card, .why-now-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run on initial load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Simple testimonial slider
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    // Show only the first testimonial initially
    for (let i = 1; i < testimonials.length; i++) {
        testimonials[i].style.display = 'none';
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            // Remove active class from all dots
            dots.forEach(d => {
                d.classList.remove('active');
            });
            
            // Show the selected testimonial and activate the dot
            testimonials[index].style.display = 'block';
            dot.classList.add('active');
        });
    });
    
    // Handle form submission with MailerLite integration
    const waitlistForm = document.querySelector('.waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const ageInput = this.querySelector('input[type="text"]');
            const email = emailInput.value;
            const childAge = ageInput.value;
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Disable the form while submitting
            emailInput.disabled = true;
            ageInput.disabled = true;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            try {
                // For security, we'll use a proxy endpoint that will handle the API key server-side
                // This is a placeholder for where you would create a secure server endpoint
                // that handles the MailerLite API call with the API key
                
                // Create subscriber data
                const subscriberData = {
                    email: email,
                    fields: {}
                };
                
                // Add child age as a custom field if provided
                if (childAge) {
                    subscriberData.fields.child_age = childAge;
                }
                
                // Send the data to our server endpoint which will handle the MailerLite API call
                // with the API key securely
                const response = await fetch('/api/waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        childAge: childAge
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Show success message
                    this.innerHTML = `<div class="success-message">
                        <h3>Thank you for joining our waitlist!</h3>
                        <p>We'll notify you at ${email} when Mindful Milo is ready.</p>
                    </div>`;
                } else {
                    // Handle API errors
                    console.error('MailerLite API error:', data);
                    throw new Error(data.message || 'Failed to join waitlist');
                }
            } catch (error) {
                console.error('Error joining waitlist:', error);
                
                // Re-enable form and show error message
                emailInput.disabled = false;
                ageInput.disabled = false;
                submitButton.disabled = false;
                submitButton.textContent = 'Join the Waitlist Now';
                
                // Add error message to the form
                const errorElement = document.createElement('p');
                errorElement.className = 'error-message';
                errorElement.textContent = 'Sorry, there was an error joining the waitlist. Please try again.';
                
                // Remove any existing error messages
                const existingError = this.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                this.appendChild(errorElement);
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .hero-text a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
