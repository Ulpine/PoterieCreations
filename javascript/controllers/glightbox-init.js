// fichier : glightbox-init.js

document.addEventListener('DOMContentLoaded', function () {
  const lightbox = GLightbox({
    selector: '.event-gallery'
  });
});


function openImageModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImg.src = img.src;
    modalImg.alt = img.alt;

    // Empêcher le scroll de la page quand la modal est ouverte
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';

    // Rétablir le scroll de la page
    document.body.style.overflow = 'auto';
}

// Fermer la modal avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});
