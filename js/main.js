// Time-based greeting
const greetingEl = document.getElementById('greeting');
if (greetingEl) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning,' : hour < 18 ? 'Good afternoon,' : 'Good evening,';
  greetingEl.textContent = greeting;
}

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('nav-open');
    spans[0].style.transform = isOpen ? 'translateY(6.5px) rotate(45deg)' : '';
    spans[1].style.opacity = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'translateY(-6.5px) rotate(-45deg)' : '';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-open');
      document.body.style.overflow = '';
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');
if (sections.length && navAnchors.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('nav-link--active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

// Experience timeline reveal
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length && 'IntersectionObserver' in window) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timelineItems.forEach((item) => item.classList.remove('is-active'));
        entry.target.classList.add('is-active');
      }
    });
  }, {
    threshold: 0.55,
    rootMargin: '-10% 0px -10% 0px',
  });

  timelineItems.forEach((item, index) => {
    if (index === 0) item.classList.add('is-active');
    timelineObserver.observe(item);
  });
}

// Fade-in on scroll for cards
const cards = document.querySelectorAll('.project-card, .research-item, .sidebar-card, .timeline-card');
if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 0.05}s`;
        entry.target.style.animation = 'fadeUp 0.5s ease both';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => cardObserver.observe(c));
}
