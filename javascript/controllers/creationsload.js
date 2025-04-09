// Fichier: javascript/controllers/creationsload.js
document.addEventListener('DOMContentLoaded', function() {
  // 1. Sélectionne toutes les images
  const lazyImages = document.querySelectorAll('img.pottery-image');

  // 2. Applique le lazy loading natif
  lazyImages.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    // Commence avec opacité 0 pour les images non encore chargées
    if (!img.complete) {
      img.style.opacity = '0';
    }
  });

  // 3. Utilise IntersectionObserver pour le chargement anticipé
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Animation de fondu pour l'apparition
          img.style.transition = 'opacity 0.3s ease';
          img.style.opacity = '1';
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '300px 0px' // Précharge 300px avant
    });

    lazyImages.forEach(img => {
      if (!img.classList.contains('loaded')) {
        imageObserver.observe(img);
      }
    });
  }

  // 4. Optimisation du défilement
  let scrollTimeout;
  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        // Désactive les transitions pendant le défilement
        document.body.classList.add('is-scrolling');
        ticking = false;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
          document.body.classList.remove('is-scrolling');
        }, 100);
      });
      ticking = true;
    }
  });
});
