// Get all the elements
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");
const imageCounter = document.getElementById("imageCounter");
const closeButton = document.querySelector(".close-button");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const potteryCards = document.querySelectorAll(".pottery-card");

let currentImageIndex = 0;
let isAnimating = false;

// Fonction de debug pour tester les boutons
function testButtons() {
  console.log("prevButton:", prevButton);
  console.log("nextButton:", nextButton);

  // Test des gestionnaires d'événements
  if (prevButton) {
    console.log("Test clic sur bouton précédent");
    prevButton.addEventListener("click", function() {
      console.log("Bouton précédent cliqué!");
    });
  }
}

// Fonction simplifiée pour changer d'image avec animation
function changeImage(direction) {
  if (isAnimating) return;
  isAnimating = true;

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

  // 1. Faire disparaître l'image actuelle avec animation
  if (direction === 'next') {
    // L'image actuelle sort vers la gauche
    modalImg.style.transition = 'all 0.4s ease';
    modalImg.style.transform = 'translateX(-100%)';
    modalImg.style.opacity = '0';
  } else {
    // L'image actuelle sort vers la droite
    modalImg.style.transition = 'all 0.4s ease';
    modalImg.style.transform = 'translateX(100%)';
    modalImg.style.opacity = '0';
  }

  // 2. Attendre que l'animation de sortie soit terminée
  setTimeout(() => {
    // Mettre à jour la source et le texte
    modalImg.src = newImg.src;
    captionText.textContent = newCaption;
    currentImageIndex = newIndex;

    // Mettre à jour le compteur
    imageCounter.textContent = `Image ${newIndex + 1} sur ${potteryCards.length}`;

    // Positionner la nouvelle image hors écran avant de l'animer
    if (direction === 'next') {
      // La nouvelle image vient de la droite
      modalImg.style.transition = 'none'; // Désactiver les transitions pour le positionnement initial
      modalImg.style.transform = 'translateX(100%)';
      modalImg.style.opacity = '0';
    } else {
      // La nouvelle image vient de la gauche
      modalImg.style.transition = 'none'; // Désactiver les transitions pour le positionnement initial
      modalImg.style.transform = 'translateX(-100%)';
      modalImg.style.opacity = '0';
    }

    // Force le navigateur à appliquer ces styles avant d'ajouter l'animation
    void modalImg.offsetWidth;

    // 3. Animer l'entrée de la nouvelle image
    modalImg.style.transition = 'all 0.4s ease';
    modalImg.style.transform = 'translateX(0)';
    modalImg.style.opacity = '1';

    // 4. Nettoyer et terminer
    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }, 400);
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
    console.log("Bouton précédent cliqué"); // Pour déboguer
    e.stopPropagation();
    changeImage('prev');
  });
}

if (nextButton) {
  nextButton.addEventListener("click", function(e) {
    console.log("Bouton suivant cliqué"); // Pour déboguer
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
  testButtons();

  // Vérifier si Hammer.js est disponible
  if (typeof Hammer !== 'undefined') {
    const modalElement = document.getElementById('imageModal');

    if (modalElement) {
      const hammer = new Hammer(modalElement);

      // Configuration pour détection horizontale
      hammer.get('swipe').set({
        direction: Hammer.DIRECTION_HORIZONTAL,
        threshold: 10,
        velocity: 0.3
      });

      // Gestionnaire d'événements pour le swipe
      hammer.on('swipeleft', function() {
        changeImage('next');
      });

      hammer.on('swiperight', function() {
        changeImage('prev');
      });
    }
  } else {
    console.warn("Hammer.js n'est pas chargé. La navigation tactile ne fonctionnera pas.");
  }
});
