document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const navbarMenu = document.querySelector('.navbar-menu');

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navbarMenu.contains(e.target)) {
      burgerMenu.classList.remove('active');
      navbarMenu.classList.remove('active');
    }
  });

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });
});
