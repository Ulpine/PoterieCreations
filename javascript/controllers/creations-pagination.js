// Fichier: javascript/controllers/creations-pagination.js

document.addEventListener('DOMContentLoaded', function() {
  const ITEMS_PER_PAGE = 16;
  const allCards = Array.from(document.querySelectorAll('.pottery-card'));
  const totalItems = allCards.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Vérifier si on est sur mobile
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Sur mobile : tout afficher, pas de pagination
    allCards.forEach(card => {
      card.style.display = '';
    });
  } else {
    // Sur desktop : pagination classique
    createPagination();
    showPage(1);
  }

  function createPagination() {
    if (!document.querySelector('.pagination-container')) {
      const paginationContainer = document.createElement('div');
      paginationContainer.className = 'pagination-container';

      const pagination = document.createElement('div');
      pagination.className = 'pagination';

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

      paginationContainer.appendChild(pagination);
      document.querySelector('.gallery-container').appendChild(paginationContainer);
    }
  }

  function showPage(pageNumber) {
    allCards.forEach(card => {
      card.style.display = 'none';
    });

    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems - 1);

    for (let i = startIndex; i <= endIndex; i++) {
      allCards[i].style.display = '';
    }

    document.querySelectorAll('.pagination-button.page-number').forEach(button => {
      button.classList.toggle('active', parseInt(button.dataset.page) === pageNumber);
    });

    document.querySelector('.prev-button').disabled = pageNumber === 1;
    document.querySelector('.next-button').disabled = pageNumber === totalPages;

    window.scrollTo({
      top: document.querySelector('.gallery-container').offsetTop - 100,
      behavior: 'smooth'
    });
  }

  // Lazy loading
  document.querySelectorAll('img.pottery-image').forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});

function handleWindowResize() {
  const isMobile = window.innerWidth <= 768;

  // Sur mobile
  if (isMobile) {
    // Supprimer la pagination si elle existe
    const paginationContainer = document.querySelector('.pagination-container');
    if (paginationContainer) {
      paginationContainer.remove();
    }

    // Afficher toutes les cartes
    allCards.forEach(card => {
      card.style.display = '';
    });
  } else {
    // Sur desktop - réactiver la pagination
    createPagination();
    // Montrer la première page ou la page actuelle
    const activePage = document.querySelector('.pagination-button.active');
    showPage(activePage ? parseInt(activePage.dataset.page) : 1);
  }
}

// Appeler la fonction au chargement et lors du redimensionnement
handleWindowResize();
window.addEventListener('resize', handleWindowResize);

// Ajouter à la fin du fichier
function syncGalleryState() {
  const allCards = Array.from(document.querySelectorAll('.pottery-card'));
  // S'assurer que les cartes visibles sont bien détectées
  allCards.forEach(card => {
    if (window.getComputedStyle(card).display !== 'none') {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible');
    }
  });
}

// Appeler cette fonction après chaque changement de page
function showPage(pageNumber) {
  // Code existant...

  // Ajouter ceci à la fin:
  syncGalleryState();
}
