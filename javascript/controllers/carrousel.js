const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-track img');
const slidesToShow = 3;
const totalImages = images.length;
let index = 0;

function nextSlide() {
    index += slidesToShow; // Avance par 3 images

    if (index >= totalImages) {
        index = 0; // Retour au début
    }

    const offset = -(index * 100 / slidesToShow);
    track.style.transform = `translateX(${offset}%)`;
}

// Défilement automatique toutes les 3 secondes
setInterval(nextSlide, 3000);
