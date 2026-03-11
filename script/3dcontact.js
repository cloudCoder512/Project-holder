const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');
function toggleMenu() {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}
menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = 10 + Math.random() * 10 + 's';
        particle.style.background = i % 2 === 0 ? '#00d9ff' : '#ff2e63';
        particlesContainer.appendChild(particle);
    }
}
window.addEventListener('load', createParticles);
document.addEventListener("DOMContentLoaded", function(){
    emailjs.init("YOUR_PUBLIC_KEY");
    const form = document.getElementById("contactForm");
    if(form){
        form.addEventListener("submit", function(event){
            event.preventDefault();
            const params = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value
            };
            emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",params)
            .then(function(){
                alert("Message sent successfully!");

                form.reset();
            })
            .catch(function(error){
                console.error("EmailJS Error:", error);
                alert("Failed to send message.");
            });
        });
    }
});