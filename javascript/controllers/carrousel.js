const track = document.querySelector('.carousel-track');
const images = track.querySelectorAll('img');
const totalImages = images.length;
let currentIndex = 0;

// Function to determine how many images to show based on screen width
function getImagesPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
}

// Function to update carousel
function updateCarousel() {
    const imagesPerView = getImagesPerView();

    // Remove existing clones
    const clones = track.querySelectorAll('.clone');
    clones.forEach(clone => clone.remove());

    // Add new clones based on current view
    const clonedImages = Array.from(images)
        .slice(0, imagesPerView)
        .map(img => {
            const clone = img.cloneNode(true);
            clone.classList.add('clone');
            return clone;
        });
    clonedImages.forEach(img => track.appendChild(img));

    // Reset position
    currentIndex = 0;
    track.style.transform = 'translateX(0)';
}

function nextSlide() {
    const imagesPerView = getImagesPerView();
    currentIndex++;

    const offset = -currentIndex * (100 / imagesPerView);
    track.style.transform = `translateX(${offset}%)`;

    if (currentIndex >= totalImages) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = 'translateX(0)';
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    }
}

// Initialize carousel
updateCarousel();

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateCarousel();
    }, 250);
});

// Start the carousel
let carouselInterval = setInterval(nextSlide, 3000);

// Pause on hover
track.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

track.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 3000);
});
