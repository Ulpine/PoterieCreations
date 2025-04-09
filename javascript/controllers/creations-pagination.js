// Fichier: javascript/controllers/creations-pagination.js

document.addEventListener('DOMContentLoaded', function() {
  // Configuration
  const ITEMS_PER_PAGE = 16;

  // Sélectionner tous les éléments
  const allCards = Array.from(document.querySelectorAll('.pottery-card'));
  const totalItems = allCards.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Créer la pagination
  createPagination();

  // Initialiser à la première page
  showPage(1);

  // Fonctions
  function createPagination() {
    // Créer le conteneur de pagination s'il n'existe pas déjà
    if (!document.querySelector('.pagination-container')) {
      const paginationContainer = document.createElement('div');
      paginationContainer.className = 'pagination-container';

      // Créer les boutons de pagination
      const pagination = document.createElement('div');
      pagination.className = 'pagination';

      // Bouton précédent
      const prevButton = document.createElement('button');
      prevButton.innerHTML = '&laquo; Précédent';
      prevButton.className = 'pagination-button prev-button';
      prevButton.addEventListener('click', function() {
        const currentPage = parseInt(document.querySelector('.pagination-button.active').dataset.page);
        if (currentPage > 1) {
          showPage(currentPage - 1);
        }
      });
      pagination.appendChild(prevButton);

      // Boutons numérotés
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'pagination-button page-number';
        pageButton.dataset.page = i;
        pageButton.addEventListener('click', function() {
          showPage(i);
        });
        pagination.appendChild(pageButton);
      }

      // Bouton suivant
      const nextButton = document.createElement('button');
      nextButton.innerHTML = 'Suivant &raquo;';
      nextButton.className = 'pagination-button next-button';
      nextButton.addEventListener('click', function() {
        const currentPage = parseInt(document.querySelector('.pagination-button.active').dataset.page);
        if (currentPage < totalPages) {
          showPage(currentPage + 1);
        }
      });
      pagination.appendChild(nextButton);

      // Ajouter la pagination au conteneur
      paginationContainer.appendChild(pagination);

      // Ajouter le conteneur après la grille de poteries
      document.querySelector('.gallery-container').appendChild(paginationContainer);
    }
  }

  function showPage(pageNumber) {
    // Cacher toutes les cartes
    allCards.forEach(card => {
      card.style.display = 'none';
    });

    // Calculer les index de début et de fin pour cette page
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems - 1);

    // Afficher uniquement les cartes de cette page
    for (let i = startIndex; i <= endIndex; i++) {
      allCards[i].style.display = '';
    }

    // Mettre à jour les boutons de pagination actifs
    document.querySelectorAll('.pagination-button.page-number').forEach(button => {
      button.classList.toggle('active', parseInt(button.dataset.page) === pageNumber);
    });

    // Mettre à jour l'état des boutons précédent/suivant
    document.querySelector('.prev-button').disabled = pageNumber === 1;
    document.querySelector('.next-button').disabled = pageNumber === totalPages;

    // Faire défiler vers le haut de la page
    window.scrollTo({
      top: document.querySelector('.gallery-container').offsetTop - 100,
      behavior: 'smooth'
    });
  }

  // Gestion du lazy loading pour les images
  document.querySelectorAll('img.pottery-image').forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});
