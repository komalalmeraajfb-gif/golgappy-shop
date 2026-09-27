// ===== PRELOADER =====
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(function() { preloader.classList.add('hidden'); }, 800);
  }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link based on scroll position
  let current = '';
  sections.forEach(function(section) {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link, .nav-btn').forEach(function(link) {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(function(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const delay = parseInt(el.getAttribute('data-delay')) || 0;

    if (rect.top < windowHeight * 0.85) {
      setTimeout(function() {
        el.classList.add('animated');
      }, delay);
    }
  });
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// ===== STAT COUNTER ANIMATION =====
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top > window.innerHeight) return;

  countersAnimated = true;
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(function(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (target >= 1000) {
        counter.textContent = current.toLocaleString();
      } else {
        counter.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', function() {
  setTimeout(animateCounters, 1000);
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== MENU CARD TILT EFFECT (subtle) =====
document.querySelectorAll('.menu-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
  });

  card.addEventListener('mouseleave', function() {
    card.style.transform = '';
  });
});

// ===== HERO PARTICLES (subtle golden dots) =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  for (var i = 0; i < 30; i++) {
    var particle = document.createElement('div');
    particle.style.cssText = 'position:absolute;width:' + (Math.random() * 4 + 2) + 'px;height:' + (Math.random() * 4 + 2) + 'px;background:rgba(212,168,67,' + (Math.random() * 0.3 + 0.1) + ');border-radius:50%;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;animation:float ' + (Math.random() * 4 + 3) + 's ease-in-out infinite;animation-delay:' + (Math.random() * 3) + 's;';
    container.appendChild(particle);
  }
}

createParticles();

// ===== NAVBAR TOGGLE ANIMATION =====
if (navToggle) {
  navToggle.addEventListener('click', function() {
    var spans = this.querySelectorAll('span');
    if (this.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[0].style.background = 'var(--gold)';
    } else {
      spans[0].style.transform = '';
      spans[0].style.background = '';
    }
  });
}

console.log('Kamal K Sahi Gol Gappy & Chat Bar - Website Loaded Successfully!');
