//javascript/controllers/creations.js
// Get all the elements
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");
const imageCounter = document.getElementById("imageCounter");
const closeButton = document.querySelector(".close-button");
const prevButton = document.querySelector(".modal-prev-button");
const nextButton = document.querySelector(".modal-next-button");
const potteryCards = document.querySelectorAll(".pottery-card");
// Détection des appareils tactiles
const isTouchDevice = ('ontouchstart' in window) ||
                      (navigator.maxTouchPoints > 0) ||
                      (navigator.msMaxTouchPoints > 0);
                      
let currentImageIndex = 0;
let isAnimating = false;




// Appliquer des optimisations spécifiques aux appareils tactiles
if (isTouchDevice) {
  document.documentElement.classList.add('touch-device');

  // Réduire la complexité des animations sur mobile
  const style = document.createElement('style');
  style.textContent = `
    .modal-content {
      transition-duration: 0.2s !important;
    }
  `;
  document.head.appendChild(style);
}

function initializeButtons() {
  // Initialisation silencieuse des boutons
  if (prevButton) {
    prevButton.addEventListener("click", function(e) {
      e.stopPropagation();
      changeImage('prev');
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function(e) {
      e.stopPropagation();
      changeImage('next');
    });
  }
}

// Dans javascript/controllers/creations.js
function changeImage(direction) {
  if (isAnimating) return;
  isAnimating = true;

  // Désactiver temporairement les événements pour éviter les doubles clics
  prevButton.disabled = true;
  nextButton.disabled = true;

  // Calculer le nouvel index
  let newIndex;
  if (direction === 'next') {
    newIndex = (currentImageIndex + 1) % potteryCards.length;
  } else {
    newIndex = (currentImageIndex - 1 + potteryCards.length) % potteryCards.length;
  }

  // Récupérer les informations de la nouvelle image
  const newImg = potteryCards[newIndex].querySelector(".pottery-image");
  const newCaption = potteryCards[newIndex].querySelector("h3").textContent;

  // Précharger la nouvelle image pour éviter le flash
  const tempImg = new Image();
  tempImg.src = newImg.src;
  tempImg.onload = function() {
    // Une fois préchargée, procéder à l'animation
    animateImageChange(direction, newImg.src, newCaption, newIndex);
  };

  // Si l'image est déjà en cache ou met trop de temps, continuer quand même
  setTimeout(() => {
    if (isAnimating) {
      animateImageChange(direction, newImg.src, newCaption, newIndex);
    }
  }, 100);
}

function animateImageChange(direction, newSrc, newCaption, newIndex) {
  // 1. Faire disparaître l'image actuelle avec une animation plus douce
  modalImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  if (direction === 'next') {
    modalImg.style.transform = 'translateX(-50px)';
  } else {
    modalImg.style.transform = 'translateX(50px)';
  }
  modalImg.style.opacity = '0';

  // 2. Attendre que l'animation de sortie soit terminée
  setTimeout(() => {
    // Mettre à jour la source et le texte
    modalImg.src = newSrc;
    captionText.textContent = newCaption;
    currentImageIndex = newIndex;

    // Positionner la nouvelle image pour l'animation d'entrée
    if (direction === 'next') {
      modalImg.style.transform = 'translateX(50px)';
    } else {
      modalImg.style.transform = 'translateX(-50px)';
    }

    // Mettre à jour le compteur
    imageCounter.textContent = `Image ${newIndex + 1} sur ${potteryCards.length}`;

    // Forcer un repaint avant d'animer
    void modalImg.offsetWidth;

    // Animer l'entrée de la nouvelle image
    modalImg.style.transform = 'translateX(0)';
    modalImg.style.opacity = '1';

    // Nettoyer et terminer
    setTimeout(() => {
      isAnimating = false;
      prevButton.disabled = false;
      nextButton.disabled = false;
    }, 300);
  }, 300);
}

// Attache l'événement de clic à chaque carte
potteryCards.forEach((card, index) => {
  card.addEventListener("click", function() {
    modal.classList.add("modal-opening");
    modal.style.display = "block";

    // Réinitialiser les styles de l'image
    modalImg.style.transition = 'none';
    modalImg.style.transform = 'none';
    modalImg.style.opacity = '1';

    // Mettre à jour la source et le texte sans animation
    const img = potteryCards[index].querySelector(".pottery-image");
    const caption = potteryCards[index].querySelector("h3").textContent;
    modalImg.src = img.src;
    captionText.textContent = caption;
    currentImageIndex = index;

    // Mettre à jour le compteur
    imageCounter.textContent = `Image ${index + 1} sur ${potteryCards.length}`;

    document.body.style.overflow = "hidden";

    // Retirer la classe après l'animation
    setTimeout(() => {
      modal.classList.remove("modal-opening");
    }, 600);

    // Afficher l'indicateur de swipe sur mobile
    showSwipeHint();
  });
});

// Fonction pour montrer l'indicateur de swipe
function showSwipeHint() {
  if (window.innerWidth <= 768) {
    const swipeHint = document.querySelector('.swipe-hint');
    if (swipeHint) {
      swipeHint.classList.add('active');
      setTimeout(() => {
        swipeHint.classList.remove('active');
      }, 2000);
    }
  }
}

// IMPORTANT: Gestionnaires d'événements pour les boutons de navigation
// Ces événements doivent être correctement configurés
if (prevButton) {
  prevButton.addEventListener("click", function(e) {
    console.log("Bouton modal précédent cliqué");
    e.stopPropagation();
    changeImage('prev');
  });
}

if (nextButton) {
  nextButton.addEventListener("click", function(e) {
    console.log("Bouton modal suivant cliqué");
    e.stopPropagation();
    changeImage('next');
  });
}

// Fermer le modal en cliquant sur le bouton fermer
closeButton.addEventListener("click", function() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Fermer le modal en cliquant en dehors de l'image
modal.addEventListener("click", function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Gestion de la navigation clavier
document.addEventListener("keydown", function(e) {
  if (modal.style.display === "block") {
    switch(e.key) {
      case "ArrowLeft":
        changeImage('prev');
        break;
      case "ArrowRight":
        changeImage('next');
        break;
      case "Escape":
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        break;
    }
  }
});

// Initialisation de Hammer.js pour la gestion tactile
document.addEventListener('DOMContentLoaded', function() {
  // Exécuter le test des boutons
  initializeButtons();

// Optimisations pour Hammer.js - dans la partie DOMContentLoaded
if (typeof Hammer !== 'undefined') {
  const modalElement = document.getElementById('imageModal');

  if (modalElement) {
    const hammer = new Hammer(modalElement);

    // Configuration optimisée pour le swipe
    hammer.get('swipe').set({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 20,
      velocity: 0.3
    });

    // Désactiver le pan vertical pour éviter les conflits
    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    // Gestionnaires d'événements pour le swipe
    hammer.on('swipeleft', function(ev) {
      if (!isAnimating) {
        changeImage('next');
      }
    });

    hammer.on('swiperight', function(ev) {
      if (!isAnimating) {
        changeImage('prev');
      }
    });
  }
}
});
