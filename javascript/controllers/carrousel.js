const track = document.querySelector('.carousel-track');
const images = track.querySelectorAll('img');
const totalImages = images.length;
let currentIndex = 0;

// Clone first few images and append them to the end for smooth infinite scroll
const clonedImages = Array.from(images)
  .slice(0, 3)
  .map(img => img.cloneNode(true));
clonedImages.forEach(img => track.appendChild(img));

function nextSlide() {
    currentIndex++;

    const offset = -currentIndex * (100 / 3);
    track.style.transform = `translateX(${offset}%)`;

    // Reset to start when reaching the end
    if (currentIndex >= totalImages) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = `translateX(0)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    }
}

// Start the carousel
setInterval(nextSlide, 3000);

// Pause on hover
track.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

track.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 3000);
  });
