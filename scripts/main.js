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

// Force Fouita widget to display same on mobile and desktop
function forceFouitaDesktopLayout() {
    setTimeout(() => {
        const widget = document.getElementById('ft1866w66');
        if (widget) {
            // Force display
            widget.style.display = 'block';
            widget.style.visibility = 'visible';
            widget.style.opacity = '1';
            
            // Find all child elements and prevent mobile responsive behavior
            const allElements = widget.querySelectorAll('*');
            allElements.forEach(el => {
                // Remove any mobile-specific classes or styles
                if (el.classList) {
                    // Remove common mobile classes
                    el.classList.remove('mobile-view', 'mobile-layout', 'responsive-mobile');
                }
                
                // Force specific styles for carousel/grid behavior
                if (el.style) {
                    el.style.minWidth = '';
                    el.style.maxWidth = '';
                }
            });
        }
    }, 1000);
    
    // Run again after a longer delay to catch late-loading content
    setTimeout(() => forceFouitaDesktopLayout(), 3000);
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', forceFouitaDesktopLayout);

// Run on window resize
window.addEventListener('resize', () => {
    setTimeout(forceFouitaDesktopLayout, 500);
});

// Use MutationObserver to watch for widget changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            const widget = document.getElementById('ft1866w66');
            if (widget && (mutation.target === widget || mutation.target.closest('#ft1866w66'))) {
                setTimeout(forceFouitaDesktopLayout, 100);
            }
        }
    });
});

// Start observing once the widget exists
setTimeout(() => {
    const widget = document.getElementById('ft1866w66');
    if (widget) {
        observer.observe(widget, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }
}, 2000);