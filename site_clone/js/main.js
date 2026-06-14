/* =============================================
   SWIFT WEB WORKS — MAIN JS
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Scroll Progress ── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  /* ── Navbar Scroll Effect ── */
  const navbar = document.getElementById('mainNavbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ── Mobile Menu Toggle ── */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu   = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileMenu.style.cssText = `
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease;
    `;
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.style.maxHeight !== '0px' && mobileMenu.style.maxHeight !== '';
      mobileMenu.style.maxHeight = isOpen ? '0px' : '500px';
    });
  }

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll Reveal Animation ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  const successMsg  = document.getElementById('successMessage');

  if (contactForm && successMsg) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // simple validation
      let valid = true;
      const inputs = contactForm.querySelectorAll('[required]');
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#e74c3c';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Animate submit button
      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate async (replace with EmailJS in production)
      setTimeout(() => {
        contactForm.style.display = 'none';
        successMsg.style.display = 'block';
      }, 1200);
    });
  }

  /* ── Counter Animation ── */
  function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target, parseInt(entry.target.dataset.counter));
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ── Smooth page fade-in ── */
  document.body.classList.add('page-transition');

});
