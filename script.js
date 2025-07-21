// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add smooth scrolling to all links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature, .speaker-card, .schedule-item, .timeline-item, .university-logo');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add loading animation delay for staggered effect
    const cards = document.querySelectorAll('.feature, .speaker-card, .university-logo');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Mobile menu toggle (if needed)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Parallax effect removed to prevent scrolling issues
    
    // Copy to clipboard functionality for contact info
    const copyElements = document.querySelectorAll('[data-copy]');
    copyElements.forEach(element => {
        element.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show success message
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
});

// Function to toggle abstract visibility
function toggleAbstract(button) {
    const abstractContent = button.nextElementSibling;
    const isVisible = abstractContent.style.display !== 'none';
    
    if (isVisible) {
        abstractContent.style.display = 'none';
        button.textContent = 'Expand Abstract';
    } else {
        abstractContent.style.display = 'block';
        button.textContent = 'Collapse Abstract';
    }
}

// Function to filter organizers by university
let currentFilter = null;

function filterByUniversity(university) {
    const universityLogos = document.querySelectorAll('.university-logo');
    const organizerCards = document.querySelectorAll('.organizer-card');
    
    // If clicking the same university, reset filter
    if (currentFilter === university) {
        currentFilter = null;
        
        // Reset all logos
        universityLogos.forEach(logo => {
            logo.classList.remove('dimmed', 'active');
        });
        
        // Reset all organizer cards
        organizerCards.forEach(card => {
            card.classList.remove('dimmed', 'highlighted');
        });
        
        return;
    }
    
    // Set new filter
    currentFilter = university;
    
    // Update university logos
    universityLogos.forEach(logo => {
        const logoUniversity = logo.getAttribute('data-university');
        if (logoUniversity === university) {
            logo.classList.remove('dimmed');
            logo.classList.add('active');
        } else {
            logo.classList.remove('active');
            logo.classList.add('dimmed');
        }
    });
    
    // Update organizer cards
    organizerCards.forEach(card => {
        const cardUniversities = card.getAttribute('data-university').split(' ');
        if (cardUniversities.includes(university)) {
            card.classList.remove('dimmed');
            card.classList.add('highlighted');
        } else {
            card.classList.remove('highlighted');
            card.classList.add('dimmed');
        }
    });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 