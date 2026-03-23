document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu Logic
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        });
    });

    // 2. Scroll Animation (Reveal) Logic
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay for a more elegant staggered feel if needed
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it hits the viewport
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Header Style Change on Scroll
    const header = document.getElementById('site-header');
    const updateHeader = () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.padding = '20px 60px';
            document.body.classList.remove('light-header');
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.padding = '40px 60px';
            document.body.classList.add('light-header');
        }
    };

    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Initial check
});
