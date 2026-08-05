/* ==========================================
   MAIN APPLICATION CONTROLLER & INTERACTIVITY
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) window.lucide.createIcons();

  // 1. Theme Switcher (Dark / Light)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme icons
    themeToggleBtns.forEach(btn => {
      btn.innerHTML = theme === 'dark' 
        ? `<i data-lucide="sun" class="w-5 h-5 text-amber-400"></i>`
        : `<i data-lucide="moon" class="w-5 h-5 text-slate-700"></i>`;
    });
    if (window.lucide) window.lucide.createIcons();
  }

  window.toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast(`Switched to ${next.toUpperCase()} mode`);
  };

  themeToggleBtns.forEach(btn => btn.addEventListener('click', window.toggleTheme));
  setTheme(storedTheme);

  // 2. Scroll Progress Bar & Navbar Scroll State
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = `${scrolled}%`;

    if (navbar) {
      if (winScroll > 50) {
        navbar.classList.add('bg-slate-950/80', 'backdrop-blur-xl', 'border-b', 'border-white/10', 'py-3', 'shadow-2xl');
        navbar.classList.remove('py-5');
      } else {
        navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-xl', 'border-b', 'border-white/10', 'shadow-2xl');
        navbar.classList.add('py-5');
      }
    }
  });

  // 3. Counter Number Animation on Scroll
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  function animateCounters() {
    if (animated) return;
    const triggerBottom = window.innerHeight * 0.85;

    counters.forEach(counter => {
      const top = counter.getBoundingClientRect().top;
      if (top < triggerBottom) {
        const target = parseFloat(counter.getAttribute('data-target'));
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0');

        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const inc = target / steps;

        const timer = setInterval(() => {
          start += inc;
          if (start >= target) {
            counter.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
            clearInterval(timer);
          } else {
            counter.textContent = `${prefix}${start.toFixed(decimals)}${suffix}`;
          }
        }, stepTime);

        animated = true;
      }
    });
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // 4. Skills Category Filtering
  const skillCategoryBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillCategoryBtns.forEach(b => b.classList.remove('active', 'bg-blue-600', 'text-white'));
      btn.classList.add('active', 'bg-blue-600', 'text-white');

      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Toast Notification System
  window.showToast = (msg) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 left-6 z-[99999] bg-slate-900/95 border border-blue-500/40 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md text-sm font-medium flex items-center gap-3 animate-bounce';
    toast.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 text-cyan-400"></i> <span>${msg}</span>`;
    document.body.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove('animate-bounce');
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };

  // 6. Contact Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      contactForm.reset();
      showToast(`Thank you ${name}! Harsh will get back to you within 24 hours.`);
    });
  }

  // 7. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }
});
