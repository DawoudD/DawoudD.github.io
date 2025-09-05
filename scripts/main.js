/*****************************************
 * FIXED MENU IMAGES FULLSCREEN FUNCTIONALITY
 *****************************************/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get menu images after DOM is loaded
  const menuImages = document.querySelectorAll('.menu-container img');
  let currentMenuFullscreenIndex = 0;

  // Make functions global so they can be called from onclick attributes
  window.openMenuFullscreen = function(index) {
    currentMenuFullscreenIndex = index;
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    if (menuImages[index] && overlay && fullscreenImage) {
      fullscreenImage.src = menuImages[index].src;
      fullscreenImage.alt = menuImages[index].alt;
      overlay.style.display = 'flex';
      
      // Prevent body scrolling when overlay is open
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeFullscreen = function() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  window.nextFullscreenImage = function() {
    if (menuImages.length > 0) {
      currentMenuFullscreenIndex = (currentMenuFullscreenIndex + 1) % menuImages.length;
      const fullscreenImage = document.getElementById('fullscreen-image');
      if (fullscreenImage && menuImages[currentMenuFullscreenIndex]) {
        fullscreenImage.src = menuImages[currentMenuFullscreenIndex].src;
        fullscreenImage.alt = menuImages[currentMenuFullscreenIndex].alt;
      }
    }
  };

  window.prevFullscreenImage = function() {
    if (menuImages.length > 0) {
      currentMenuFullscreenIndex = (currentMenuFullscreenIndex - 1 + menuImages.length) % menuImages.length;
      const fullscreenImage = document.getElementById('fullscreen-image');
      if (fullscreenImage && menuImages[currentMenuFullscreenIndex]) {
        fullscreenImage.src = menuImages[currentMenuFullscreenIndex].src;
        fullscreenImage.alt = menuImages[currentMenuFullscreenIndex].alt;
      }
    }
  };

  // Close fullscreen on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.closeFullscreen();
    }
  });

  // Navigate with arrow keys when fullscreen is open
  document.addEventListener('keydown', function(e) {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay && overlay.style.display === 'flex') {
      if (e.key === 'ArrowRight') {
        window.nextFullscreenImage();
      } else if (e.key === 'ArrowLeft') {
        window.prevFullscreenImage();
      }
    }
  });
});