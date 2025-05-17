// DOM Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// Make project cards clickable
projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Only redirect if the click wasn't on a link (to avoid double redirects)
        if (!e.target.closest('a')) {
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        }
    });
    
    // Add cursor style to indicate clickable
    card.style.cursor = 'pointer';
});

// Toggle mobile navigation
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate burger menu
    burger.querySelectorAll('div').forEach((line, index) => {
        line.classList.toggle('active');
    });
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.querySelectorAll('div').forEach(line => {
            line.classList.remove('active');
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission handling
if (contactForm) {
    // Remove custom handler as Formspree will handle submission
    // Just add a loading state
    contactForm.addEventListener('submit', function(e) {
        // Don't prevent default - let Formspree handle it
        
        // Add loading state to button
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
    });
    
    // Remove error class when user types
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Animated skill bars
const skillBars = document.querySelectorAll('.skill-progress');

// Animation will be triggered when the element is in view
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isInView = (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
        
        if (isInView) {
            bar.style.width = bar.style.width || '0%';
            
            // Add animation class
            bar.classList.add('animate');
        }
    });
};

// Initial check and scroll event listener for animations
animateSkillBars();
window.addEventListener('scroll', animateSkillBars);

// Add hero interactions
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image img');
    const heroContainer = document.querySelector('.hero');
    const designElements = document.querySelectorAll('.design-element');
    
    // Make hero image follow mouse movement slightly
    heroContainer.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        
        // Move design elements in opposite direction for parallax effect
        designElements.forEach(element => {
            const speed = element.getAttribute('id').includes('1') ? 2 : 
                          element.getAttribute('id').includes('2') ? 1.5 : 1;
            const xMove = (e.pageX / window.innerWidth) * 20 * speed;
            const yMove = (e.pageY / window.innerHeight) * 20 * speed;
            element.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    });
    
    // Reset transforms when mouse leaves
    heroContainer.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        designElements.forEach(element => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
    
    // Change text color on hover for enhanced interactivity
    const heroHeading = document.querySelector('.hero-content h1');
    
    heroHeading.addEventListener('mouseenter', () => {
        heroHeading.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
        heroHeading.style.webkitBackgroundClip = 'text';
        heroHeading.style.webkitTextFillColor = 'transparent';
        heroHeading.style.backgroundClip = 'text';
    });
    
    heroHeading.addEventListener('mouseleave', () => {
        heroHeading.style.background = 'none';
        heroHeading.style.webkitTextFillColor = 'initial';
        heroHeading.style.color = 'var(--text-color)';
        heroHeading.querySelector('span').style.color = 'var(--primary-color)';
    });
});

// Add CSS styles for animations
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    .skill-progress {
        width: 0%;
        transition: width 1.5s ease-in-out;
    }
    .skill-progress.animate {
        width: var(--width, 90%);
    }
    .form-success {
        background-color: rgba(76, 175, 80, 0.1);
        color: #4CAF50;
        padding: 15px;
        border-radius: 5px;
        margin-top: 20px;
        text-align: center;
    }
    .error {
        border-color: #f44336 !important;
    }
    .burger div.active:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .burger div.active:nth-child(2) {
        opacity: 0;
    }
    .burger div.active:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(styleSheet);

// Initialize skill bar widths from the DOM
document.addEventListener('DOMContentLoaded', () => {
    skillBars.forEach(bar => {
        // Get width from inline style
        const width = bar.style.width;
        // Store it as a CSS variable
        bar.style.setProperty('--width', width);
        // Reset width to 0 for animation
        bar.style.width = '0%';
    });
});

// Project Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!projectGrid || !prevArrow || !nextArrow) return;
    
    let currentIndex = 0;
    const cardWidth = projectCards[0].offsetWidth + 25; // Card width + gap
    
    // Function to scroll to specific card
    const scrollToCard = (index) => {
        if (index < 0) index = 0;
        if (index > projectCards.length - 1) index = projectCards.length - 1;
        
        currentIndex = index;
        
        projectGrid.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
        
        // Update active dot
        sliderDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
    
    // Next button click
    nextArrow.addEventListener('click', () => {
        scrollToCard(currentIndex + 1);
    });
    
    // Previous button click
    prevArrow.addEventListener('click', () => {
        scrollToCard(currentIndex - 1);
    });
    
    // Dot navigation
    sliderDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            scrollToCard(index);
        });
    });
    
    // Handle scroll event to update dots
    projectGrid.addEventListener('scroll', () => {
        const scrollPosition = projectGrid.scrollLeft;
        const activeIndex = Math.round(scrollPosition / cardWidth);
        
        sliderDots.forEach((dot, i) => {
            if (i === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentIndex = activeIndex;
    });
    
    // Handle scroll snap with keyboard
    document.addEventListener('keydown', (e) => {
        // Only respond to arrow keys when project section is in view
        const projectSection = document.getElementById('projects');
        const rect = projectSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (e.key === 'ArrowRight') {
                scrollToCard(currentIndex + 1);
            } else if (e.key === 'ArrowLeft') {
                scrollToCard(currentIndex - 1);
            }
        }
    });
    
    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    projectGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    projectGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next card
            scrollToCard(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous card
            scrollToCard(currentIndex - 1);
        }
    };
}); 