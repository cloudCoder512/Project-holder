        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            if (!particlesContainer) return;
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
       function logout(){
    localStorage.removeItem("currentUser");
    window.location.replace("../index.html");
        }
        window.addEventListener('load', function() {
            createParticles();
        });
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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