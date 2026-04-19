    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('overlay');
    
    function toggleMenu() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    if(menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if(overlay) overlay.addEventListener('click', toggleMenu);
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if(navLinks.classList.contains('active')) toggleMenu();
            const hash = link.getAttribute('href');
            if(hash && hash.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(hash);
                if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Skill bars animation
    const fillBars = document.querySelectorAll('.progress-fill');
    const observerSkill = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const el = entry.target;
                const w = el.getAttribute('data-width');
                el.style.width = w + '%';
                observerSkill.unobserve(el);
            }
        });
    }, { threshold: 0.3 });
    fillBars.forEach(bar => observerSkill.observe(bar));

    // Scroll reveal animation
    const animatedItems = document.querySelectorAll('.animate-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });
    animatedItems.forEach(item => revealObserver.observe(item));

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        if(cursor) cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if(window.innerWidth > 980 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
