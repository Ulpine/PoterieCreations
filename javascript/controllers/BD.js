document.addEventListener('DOMContentLoaded', function() {
  const bubbles = document.querySelectorAll('.speech-bubble');

  function checkScroll() {
    bubbles.forEach((bubble, index) => {
      const bubbleTop = bubble.getBoundingClientRect().top;
      const screenPosition = window.innerHeight * 0.8;

      if(bubbleTop < screenPosition) {
        bubble.style.animation = `popIn 0.5s ease-out ${index * 0.2}s forwards`;
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check
});
