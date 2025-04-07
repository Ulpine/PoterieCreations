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


document.addEventListener("DOMContentLoaded", function () {
  // Vérifie si l'URL contient .html
  const currentPath = window.location.pathname;
  if (currentPath.endsWith(".html")) {
      // Crée une redirection sans .html
      const newPath = currentPath.slice(0, -5);
      window.location.replace(newPath);  // Redirection vers la page sans .html
  }
});
