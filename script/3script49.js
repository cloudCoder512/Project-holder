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
            link.addEventListener('click', function(event) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    event.preventDefault();
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
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        window.addEventListener('load', function() {
            document.querySelectorAll('.skill-progress-bar').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = 15 + Math.random() * 10 + 's';
                particlesContainer.appendChild(particle);
            }
        });