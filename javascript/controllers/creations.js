// Get the modal elements
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");
const closeButton = document.querySelector(".close-button");

// Get all pottery cards
const potteryCards = document.querySelectorAll(".pottery-card");

// Add click event to each pottery card
potteryCards.forEach(card => {
  card.addEventListener("click", function() {
    const img = this.querySelector(".pottery-image");
    const caption = this.querySelector("h3").textContent;

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.textContent = caption;

    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  });
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

// Close modal with Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
