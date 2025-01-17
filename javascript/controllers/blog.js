document.addEventListener('DOMContentLoaded', () => {
  // Get all article cards
  const articles = document.querySelectorAll('.articles > div');

  // Add initial classes for animations
  articles.forEach((article, index) => {
      article.classList.add('article-fade-up');
      article.classList.add('article-hover');

      // Make the entire card clickable
      article.style.cursor = 'pointer';

      // Get the link URL from the card's anchor tag
      const link = article.querySelector('a');
      const url = link.href;

      // Add click event to the entire card
      article.addEventListener('click', (e) => {
          // Prevent default action if clicking on the anchor tag
          if (e.target.tagName === 'A') {
              e.preventDefault();
          }

          // Add click animation
          article.style.transform = 'scale(0.98)';

          // Redirect after a brief delay for animation
          setTimeout(() => {
              window.location.href = url;
          }, 150);
      });

      // Delay each card's appearance
      setTimeout(() => {
          article.classList.add('article-visible');
      }, 200 * index);
  });

  // Optional: Animate cards when they come into view
  const observerOptions = {
      threshold: 0.2,
      rootMargin: '50px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('article-visible');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  // Observe each article
  articles.forEach(article => {
      observer.observe(article);
  });
});
