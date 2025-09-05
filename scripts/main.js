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

// Viewport spoofing and widget override
(function() {
  // Override viewport detection
  let originalInnerWidth = window.innerWidth;
  let originalOuterWidth = window.outerWidth;
  
  // Spoof desktop viewport for widget
  function spoofDesktopViewport() {
    // Override window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200
    });
    
    Object.defineProperty(window, 'outerWidth', {
      writable: true,
      configurable: true,
      value: 1200
    });
    
    // Override screen object
    Object.defineProperty(window.screen, 'width', {
      writable: true,
      configurable: true,
      value: 1200
    });
    
    // Override media query results
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = function(query) {
      if (query.includes('max-width')) {
        return {
          matches: false,
          media: query,
          addListener: function() {},
          removeListener: function() {},
          addEventListener: function() {},
          removeEventListener: function() {}
        };
      }
      return originalMatchMedia.call(this, query);
    };
  }
  
  function restoreViewport() {
    // Restore original values after widget loads
    setTimeout(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth
      });
      
      Object.defineProperty(window, 'outerWidth', {
        writable: true,
        configurable: true,
        value: originalOuterWidth
      });
    }, 5000);
  }
  
  // Apply viewport spoofing before widget loads
  spoofDesktopViewport();
  
  // Restore after widget initialization
  setTimeout(restoreViewport, 5000);
  
  // Force desktop layout after widget loads
  function forceDesktopLayout() {
    setTimeout(() => {
      const widget = document.getElementById('ft1866w66');
      if (widget) {
        // Force all child elements to use desktop styling
        const allElements = widget.querySelectorAll('*');
        allElements.forEach(el => {
          if (el.style) {
            el.style.width = '';
            el.style.minWidth = '';
            el.style.maxWidth = '';
            el.style.flexDirection = '';
            el.style.flexWrap = '';
          }
          
          // Remove mobile classes
          if (el.classList) {
            const classesToRemove = Array.from(el.classList).filter(cls => 
              cls.includes('mobile') || 
              cls.includes('responsive') || 
              cls.includes('small')
            );
            classesToRemove.forEach(cls => el.classList.remove(cls));
          }
        });
        
        // Force container to maintain width
        widget.style.width = '100%';
        widget.style.minWidth = '100%';
        
        console.log('Fouita widget desktop layout forced');
      }
    }, 2000);
    
    // Second attempt after longer delay
    setTimeout(() => forceDesktopLayout(), 4000);
  }
  
  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceDesktopLayout);
  } else {
    forceDesktopLayout();
  }
})();


src="https://wdg.fouita.com/widgets/0x26674b.js"