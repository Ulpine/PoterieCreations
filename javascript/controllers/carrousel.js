const track = document.querySelector('.carousel-track');
const images = track.querySelectorAll('img');
const totalImages = images.length;
let currentIndex = 0;

// Clone first four images instead of three
const clonedImages = Array.from(images)
  .slice(0, 4)
  .map(img => img.cloneNode(true));
clonedImages.forEach(img => track.appendChild(img));

function nextSlide() {
    currentIndex++;

    const offset = -currentIndex * (100 / 4); // Adjusted for 4 images
    track.style.transform = `translateX(${offset}%)`;

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
let carouselInterval = setInterval(nextSlide, 3000);

// Pause on hover
track.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

track.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 3000);
});
