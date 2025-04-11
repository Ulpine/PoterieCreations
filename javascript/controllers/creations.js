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

// Function to update modal content
function updateModalImage(index, direction = null) {
  if (isAnimating) return;

  const img = potteryCards[index].querySelector(".pottery-image");
  const caption = potteryCards[index].querySelector("h3").textContent;

  if (direction) {
      isAnimating = true;

      // Ajoute l'animation d'abord
      modalImg.classList.add('slide-animation', direction === 'next' ? 'slide-left' : 'slide-right');

      // Attends un peu avant de changer l'image (le temps que l'effet démarre visuellement)
      setTimeout(() => {
          modalImg.src = img.src;
          captionText.textContent = caption;
          currentImageIndex = index;
          imageCounter.textContent = `Image ${index + 1} sur ${potteryCards.length}`;
      }, 50); // test avec 50ms, ajuste si besoin

      // Enlève l'animation une fois terminée
      setTimeout(() => {
          modalImg.classList.remove('slide-animation', 'slide-left', 'slide-right');
          isAnimating = false;
      }, 500); // correspond à ta animation-duration: 0.5s;
  } else {
      // Pas d'animation → on change tout de suite
      modalImg.src = img.src;
      captionText.textContent = caption;
      currentImageIndex = index;
      imageCounter.textContent = `Image ${index + 1} sur ${potteryCards.length}`;
  }
}


// Fonction pour afficher l'indicateur de swipe
function showSwipeHint() {
    // Vérifier si l'utilisateur est sur mobile
    if (window.innerWidth <= 768) {
        const swipeHint = document.querySelector('.swipe-hint');
        if (swipeHint) {
            swipeHint.classList.add('active');

            // Supprimer la classe après l'animation
            setTimeout(() => {
                swipeHint.classList.remove('active');
            }, 2000);
        }
    }
}

// Add click event to each pottery card - UNIQUEMENT UN ÉVÉNEMENT
potteryCards.forEach((card, index) => {
    card.addEventListener("click", function() {
        modal.style.display = "block";
        updateModalImage(index);
        document.body.style.overflow = "hidden";

        // Ajouter l'animation de l'indicateur de swipe
        showSwipeHint();
    });
});

// Previous button click
prevButton.addEventListener("click", function(e) {
    e.stopPropagation();
    if (isAnimating) return; // Ne pas traiter si une animation est en cours

    let newIndex = currentImageIndex - 1;
    if (newIndex < 0) {
        newIndex = potteryCards.length - 1;
    }
    updateModalImage(newIndex, 'prev');
});

// Next button click
nextButton.addEventListener("click", function(e) {
    e.stopPropagation();
    if (isAnimating) return; // Ne pas traiter si une animation est en cours

    let newIndex = currentImageIndex + 1;
    if (newIndex >= potteryCards.length) {
        newIndex = 0;
    }
    updateModalImage(newIndex, 'next');
});

// Close modal when clicking the close button
closeButton.addEventListener("click", function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Close modal when clicking outside the image
modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Handle keyboard navigation
document.addEventListener("keydown", function(e) {
    if (modal.style.display === "block") {
        switch(e.key) {
            case "ArrowLeft":
                if (!isAnimating) prevButton.click();
                break;
            case "ArrowRight":
                if (!isAnimating) nextButton.click();
                break;
            case "Escape":
                modal.style.display = "none";
                document.body.style.overflow = "auto";
                break;
        }
    }
});

// Initialisation de Hammer.js et gestion tactile
document.addEventListener('DOMContentLoaded', function() {
    // Référence à l'élément modal
    const modal = document.getElementById('imageModal');

    // Ne configurer Hammer que si nous sommes sur la page avec le modal
    if (modal) {
        // Initialiser Hammer sur l'élément modal
        const hammer = new Hammer(modal);

        // Configuration pour détection horizontale
        hammer.get('swipe').set({
            direction: Hammer.DIRECTION_HORIZONTAL,
            threshold: 10,          // Réduire le seuil pour une meilleure sensibilité
            velocity: 0.3           // Réduire la vélocité requise pour un swipe plus facile
        });

        // Gestionnaire d'événement pour le swipe
        hammer.on('swipeleft', function() {
            if (!isAnimating) {
                // Swipe gauche - image suivante
                nextImage();
            }
        });

        hammer.on('swiperight', function() {
            if (!isAnimating) {
                // Swipe droit - image précédente
                prevImage();
            }
        });

        // Fonctions pour gérer les images
        function nextImage() {
            const nextButton = document.querySelector('.next-button');
            if (nextButton && !isAnimating) {
                nextButton.click();
            }
        }

        function prevImage() {
            const prevButton = document.querySelector('.prev-button');
            if (prevButton && !isAnimating) {
                prevButton.click();
            }
        }

        // Variables pour le suivi du toucher
        let touchStartX = 0;
        let isSwiping = false;
    }
});
