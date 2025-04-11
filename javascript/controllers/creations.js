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

// Function to update modal content
function updateModalImage(index, direction = null) {
    const img = potteryCards[index].querySelector(".pottery-image");
    const caption = potteryCards[index].querySelector("h3").textContent;

    // Remove previous animation classes
    modalImg.classList.remove('slide-left', 'slide-right', 'slide-animation');

    // Trigger reflow to restart animation
    void modalImg.offsetWidth;

    // Add new animation class based on direction
    if (direction) {
        modalImg.classList.add('slide-animation', direction === 'next' ? 'slide-left' : 'slide-right');
    }

    modalImg.src = img.src;
    captionText.textContent = caption;
    currentImageIndex = index;

    // Update counter
    imageCounter.textContent = `Image ${index + 1} of ${potteryCards.length}`;
}

// Add click event to each pottery card
potteryCards.forEach((card, index) => {
    card.addEventListener("click", function() {
        modal.style.display = "block";
        updateModalImage(index);
        document.body.style.overflow = "hidden";
    });
});

// Previous button click
prevButton.addEventListener("click", function(e) {
    e.stopPropagation();
    let newIndex = currentImageIndex - 1;
    if (newIndex < 0) {
        newIndex = potteryCards.length - 1;
    }
    updateModalImage(newIndex, 'prev');
});

// Next button click
nextButton.addEventListener("click", function(e) {
    e.stopPropagation();
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
                prevButton.click();
                break;
            case "ArrowRight":
                nextButton.click();
                break;
            case "Escape":
                modal.style.display = "none";
                document.body.style.overflow = "auto";
                break;
        }
    }
});



document.addEventListener('DOMContentLoaded', function() {
  // Référence à l'élément modal
  const modal = document.getElementById('imageModal');

  // Ne configurer Hammer que si nous sommes sur la page avec le modal
  if (modal) {
    // Initialiser Hammer sur l'élément modal
    const hammer = new Hammer(modal);

    // Configuration pour détection horizontale
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    // Gestionnaire d'événement pour le swipe
    hammer.on('swipeleft', function() {
      // Swipe gauche - image suivante
      nextImage();
    });

    hammer.on('swiperight', function() {
      // Swipe droit - image précédente
      prevImage();
    });

    // Fonctions pour gérer les images (utilisez vos fonctions existantes ou adaptez celles-ci)
    function nextImage() {
      // Utilisez votre logique existante pour l'image suivante
      const nextButton = document.querySelector('.next-button');
      if (nextButton) {
        nextButton.click(); // Simulation du clic sur le bouton "suivant"
      }
    }

    function prevImage() {
      // Utilisez votre logique existante pour l'image précédente
      const prevButton = document.querySelector('.prev-button');
      if (prevButton) {
        prevButton.click(); // Simulation du clic sur le bouton "précédent"
      }
    }

    // Ajout d'un indicateur visuel pour le swipe (optionnel)
    let touchStartX = 0;
    let touchMoveX = 0;

    modal.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    }, false);

    modal.addEventListener('touchmove', function(e) {
      touchMoveX = e.touches[0].clientX;

      // Calculer le déplacement
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        const offset = touchMoveX - touchStartX;

        // Limiter le déplacement pour un effet de résistance
        const limitedOffset = Math.min(100, Math.max(-100, offset));

        // Appliquer un léger déplacement visuel pendant le swipe
        modalContent.style.transform = `translateX(${limitedOffset * 0.3}px)`;
      }
    }, false);

    modal.addEventListener('touchend', function() {
      // Réinitialiser la position
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.style.transform = '';
      }
    }, false);
  }
});

// Add click event to each pottery card
potteryCards.forEach((card, index) => {
  card.addEventListener("click", function() {
      modal.style.display = "block";
      updateModalImage(index);
      document.body.style.overflow = "hidden";

      // Ajouter l'animation de l'indicateur de swipe
      showSwipeHint();
  });
});

// Fonction pour afficher l'indicateur de swipe
function showSwipeHint() {
  // Vérifier si l'utilisateur est sur mobile (vous pouvez ajuster cette condition selon vos besoins)
  if (window.innerWidth <= 768) {  // Exemple pour un seuil de 768px
      const swipeHint = document.querySelector('.swipe-hint');
      if (swipeHint) {
          swipeHint.classList.add('active');

          // Supprimer la classe après l'animation pour qu'elle ne se répète pas
          setTimeout(() => {
              swipeHint.classList.remove('active');
          }, 2000);
      }
  }
}
