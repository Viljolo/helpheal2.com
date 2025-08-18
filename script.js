// Energy Particles Creation
function createEnergyParticles() {
    const particlesContainer = document.getElementById('energyParticles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color from healing palette
        const colors = ['#8B5CF6', '#EC4899', '#10B981', '#3B82F6', '#F59E0B'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Navigation Toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Form Handling
function initContactForm() {
    const form = document.getElementById('connectionForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email) {
                showNotification('Täytäthän pakolliset kentät.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Kiitos yhteydenotostasi! Otan sinuun yhteyttä pian.', 'success');
            
            // Reset form
            form.reset();
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .quality, .contact-item');
    animateElements.forEach(el => observer.observe(el));
}

// Parallax Effect for Hero Section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Energy Wave Animation
function initEnergyWaves() {
    const waves = document.querySelector('.energy-waves');
    if (waves) {
        // Create multiple wave layers
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'wave-layer';
            wave.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><path fill="rgba(255,255,255,${0.05 + i * 0.05})" d="M0,0V800H1200V0C1200,0,800,400,400,400S0,0,0,0Z"/></svg>') no-repeat;
                background-size: cover;
                animation: wave ${20 + i * 5}s infinite linear;
                animation-delay: ${i * 2}s;
            `;
            waves.appendChild(wave);
        }
    }
}

// Sacred Geometry Interaction
function initSacredGeometry() {
    const geometry = document.querySelector('.sacred-geometry');
    if (geometry) {
        geometry.addEventListener('mouseenter', () => {
            const elements = geometry.querySelectorAll('*');
            elements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        });
        
        geometry.addEventListener('mouseleave', () => {
            const elements = geometry.querySelectorAll('*');
            elements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        });
    }
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Healing Energy Effect on Form Focus
function initFormEnergy() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createEnergyParticles();
    initSmoothScrolling();
    initMobileNav();
    initContactForm();
    initScrollAnimations();
    initParallax();
    initEnergyWaves();
    initSacredGeometry();
    initNavbarScroll();
    initFormEnergy();
    
    // Add some CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .quality, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .service-card.animate-in, .quality.animate-in, .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .wave-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
    `;
    document.head.appendChild(style);
});

// Add some healing energy to the page load
window.addEventListener('load', function() {
    // Create a subtle healing glow effect
    const healingGlow = document.createElement('div');
    healingGlow.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        animation: healingGlow 3s ease-out forwards;
    `;
    
    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
        @keyframes healingGlow {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0; transform: scale(1.5); }
        }
    `;
    
    document.head.appendChild(glowStyle);
    document.body.appendChild(healingGlow);
    
    // Remove after animation
    setTimeout(() => {
        healingGlow.remove();
        glowStyle.remove();
    }, 3000);
});
