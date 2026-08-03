// Mobile Navigation Toggle

document.addEventListener('DOMContentLoaded', () => {
    // Add active state to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from siblings
            const parent = button.parentElement;
            parent.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            button.classList.add('active');
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.diamond-card, .icon-item, .tree-illustration');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    // Initial check for visible elements
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});




document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const mobile = formData.get('mobile');

    // Here you would typically send this data to your server
    console.log('Form submitted:', { name, email, mobile });
    
    // Show success message
    alert('Thank you for signing up!');
    
    // Reset form
    this.reset();
});

document.addEventListener('DOMContentLoaded', function() {
    const diagram = document.querySelector('.diagram');
    const icons = document.querySelectorAll('.icon');
    
    // Create connectors dynamically
    icons.forEach((icon, index) => {
        const rect = icon.getBoundingClientRect();
        const centerRect = diagram.getBoundingClientRect();
        
        const connector = document.createElement('div');
        connector.className = 'connector';
        
        // Calculate angle for each connector
        const angle = (index * 72 - 90) * (Math.PI / 180);
        connector.style.transform = `rotate(${angle}rad)`;
        
        diagram.appendChild(connector);
    });
});



// document.addEventListener("DOMContentLoaded", function () {
//     const hamburger = document.querySelector(".hamburger");
//     const nav = document.querySelector(".nav");
  
//     hamburger.addEventListener("click", function () {
//       if (nav.classList.contains("active")) {
//         nav.classList.remove("active");
//         hamburger.classList.remove("active");
//       } else {
//         nav.classList.add("active");
//         hamburger.classList.add("active");
//       }
//     });
//   });







