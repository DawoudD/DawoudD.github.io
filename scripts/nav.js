// Mobile hamburger nav toggle
(function () {
  const nav = document.querySelector('nav');
  const hamburger = document.getElementById('navHamburger');
  const links = document.getElementById('navLinks');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', function () {
    nav.classList.toggle('nav-open');
    const isOpen = nav.classList.contains('nav-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when any nav link is clicked
  if (links) {
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();
