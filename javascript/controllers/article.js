// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Function to check if element is in viewport
  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight)
      );
  }

  // Get all sections (h2s and paragraphs)
  const sections = document.querySelectorAll('.article h2, .article p');

  // Function to handle scroll animation
  function handleScroll() {
      sections.forEach(section => {
          if (isInViewport(section) && !section.style.animationName) {
              section.style.animationName = 'fadeInUp';
              // Add slight delay for paragraphs
              if (section.tagName === 'P') {
                  section.style.animationDelay = '0.2s';
              }
          }
      });
  }

  // Initial check
  handleScroll();

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
});
