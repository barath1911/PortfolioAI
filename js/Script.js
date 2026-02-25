(function() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ── Custom Cursor ──
  var cursor = document.getElementById('cursor');
  var ring = document.getElementById('cursorRing');
  document.addEventListener('mousemove', function(e) {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.05 });
    gsap.to(ring,   { x: e.clientX, y: e.clientY, duration: 0.22 });
  });
  document.querySelectorAll('a, button, .skill-orb-wrap, .project-card, .social-link').forEach(function(el) {
    el.addEventListener('mouseenter', function() { gsap.to(ring, { scale: 2, opacity: 0.4, duration: 0.25 }); });
    el.addEventListener('mouseleave', function() { gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25 }); });
  });

  // ── Scroll Progress Bar ──
  var progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', function() {
    var pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.transform = 'scaleX(' + pct + ')';
  });

  // ── Navbar scroll ──
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── Active nav links on scroll ──
  var sections = document.querySelectorAll('section');
  var navLinks = document.querySelectorAll('.nav-link');
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        var match = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(function(s) { io.observe(s); });

  // ── Hamburger menu ──
  var ham = document.getElementById('hamburger');
  var navList = document.getElementById('navLinks');
  ham.addEventListener('click', function() {
    ham.classList.toggle('open');
    navList.classList.toggle('open');
  });
  navList.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      ham.classList.remove('open');
      navList.classList.remove('open');
    });
  });

  // ── Dark / Light toggle ──
  document.getElementById('toggleBtn').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
  });

  // ── Smooth scroll for nav links ──
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(a.getAttribute('href'));
      if (target) gsap.to(window, { scrollTo: target, duration: 1.2, ease: 'power3.inOut' });
    });
  });

  // ── GSAP: Home entrance ──
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('#homeBadge', { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
    .to('#homeTitle', { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
    .to('#homeSub',   { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('#heroBtns',  { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('#scrollIndicator', { opacity: 1, duration: 0.8 }, '-=0.3');

  // ── GSAP: About ──
  gsap.from('#aboutAvatar', { scrollTrigger: { trigger: '#about', start: 'top 75%' }, opacity: 0, x: -80, duration: 1, ease: 'power3.out' });
  gsap.from('#aboutText',   { scrollTrigger: { trigger: '#about', start: 'top 75%' }, opacity: 0, x:  80, duration: 1, ease: 'power3.out', delay: 0.2 });
  gsap.from('.social-link', { scrollTrigger: { trigger: '#about', start: 'top 75%' }, opacity: 0, y: 20, duration: 0.6, stagger: 0.08, delay: 0.5, ease: 'back.out(1.5)' });

  // ── GSAP: Section headers ──
  document.querySelectorAll('.section-header').forEach(function(el) {
    gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 80%' }, opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' });
  });

  // ── GSAP: Timeline ──
  gsap.from('.timeline-item', { scrollTrigger: { trigger: '#resume', start: 'top 70%' }, opacity: 0, x: -30, duration: 0.7, stagger: 0.12, ease: 'power2.out' });

  // ── GSAP: Skill orbs entrance ──
  gsap.from('.skill-orb-wrap', { scrollTrigger: { trigger: '#skillsGrid', start: 'top 80%' }, opacity: 0, scale: 0, duration: 0.55, stagger: 0.05, ease: 'back.out(2)' });
  gsap.from('.skill-cat-label', { scrollTrigger: { trigger: '#skillsGrid', start: 'top 80%' }, opacity: 0, x: -20, duration: 0.5, stagger: 0.12, ease: 'power2.out' });

  // ── Skill Orb hover: glow + scale (JS to avoid CSS animation conflict) ──
  document.querySelectorAll('.skill-orb-wrap').forEach(function(wrap) {
    var spinner = wrap.querySelector('.orb-spinner');
    var orb = wrap.querySelector('.skill-orb');
    if (!spinner || !orb) return;

    // Read --oc custom property from inline style
    var inlineStyle = spinner.getAttribute('style') || '';
    var match = inlineStyle.match(/--oc:\s*([^;]+)/);
    var color = match ? match[1].trim() : '#6c63ff';

    wrap.addEventListener('mouseenter', function() {
      wrap.classList.add('hovered');
      spinner.style.transform = 'scale(1.22)';
      spinner.style.animationPlayState = 'paused';
      orb.style.animationPlayState = 'paused';
      orb.style.borderColor = color;
      orb.style.background = color + '22';
      orb.style.boxShadow = '0 0 0 3px ' + color + '33, 0 0 30px ' + color + '99, 0 10px 28px rgba(0,0,0,0.35)';
    });

    wrap.addEventListener('mouseleave', function() {
      wrap.classList.remove('hovered');
      spinner.style.transform = '';
      spinner.style.animationPlayState = '';
      orb.style.animationPlayState = '';
      orb.style.borderColor = '';
      orb.style.background = '';
      orb.style.boxShadow = '';
    });
  });

  // ── GSAP: Projects ──
  gsap.from('.project-card', { scrollTrigger: { trigger: '#projects', start: 'top 70%' }, opacity: 0, y: 80, duration: 0.9, stagger: 0.18, ease: 'power3.out' });

  // ── GSAP: Contact form ──
  gsap.from('#contactForm', { scrollTrigger: { trigger: '#contact', start: 'top 75%' }, opacity: 0, y: 60, scale: 0.97, duration: 1, ease: 'power3.out' });

  // ── Send button: ripple + toast ──
  var sendBtn = document.getElementById('sendBtn');
  var toast   = document.getElementById('toast');
  sendBtn.addEventListener('click', function(e) {
    var name  = document.getElementById('nameInput').value.trim();
    var email = document.getElementById('emailInput').value.trim();
    if (!name || !email) {
      gsap.to('#contactForm', { x: -10, duration: 0.08, repeat: 5, yoyo: true, ease: 'power1.inOut', onComplete: function() { gsap.set('#contactForm', { x: 0 }); } });
      return;
    }
    // Ripple
    var rect = sendBtn.getBoundingClientRect();
    var rp = document.createElement('span');
    rp.className = 'ripple';
    rp.style.left = (e.clientX - rect.left) + 'px';
    rp.style.top  = (e.clientY - rect.top)  + 'px';
    sendBtn.appendChild(rp);
    setTimeout(function() { rp.remove(); }, 700);

    gsap.to(sendBtn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 3500);

    document.getElementById('nameInput').value    = '';
    document.getElementById('emailInput').value   = '';
    document.getElementById('messageInput').value = '';
  });

})();