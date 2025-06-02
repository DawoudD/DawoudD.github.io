/*****************************************
 * MENU IMAGES (Fullscreen Functionality)
 *****************************************/
const menuImages = document.querySelectorAll('.menu-container img');
let currentMenuFullscreenIndex = 0;
let activeGroup = null;

function openMenuFullscreen(index) {
  activeGroup = 'menu';
  currentMenuFullscreenIndex = index;
  const overlay = document.getElementById('fullscreen-overlay');
  const fullscreenImage = document.getElementById('fullscreen-image');
  fullscreenImage.src = menuImages[index].src;
  overlay.style.display = 'flex';
}

/*****************************************
 * FULLSCREEN SHARED OVERLAY CONTROLS
 *****************************************/
function closeFullscreen() {
  document.getElementById('fullscreen-overlay').style.display = 'none';
}

function prevFullscreenImage() {
  if (activeGroup === 'menu') {
    currentMenuFullscreenIndex =
      (currentMenuFullscreenIndex - 1 + menuImages.length) % menuImages.length;
    document.getElementById('fullscreen-image').src =
      menuImages[currentMenuFullscreenIndex].src;
  } else if (activeGroup === 'gallery') {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
  }
}

function nextFullscreenImage() {
  if (activeGroup === 'menu') {
    currentMenuFullscreenIndex =
      (currentMenuFullscreenIndex + 1) % menuImages.length;
    document.getElementById('fullscreen-image').src =
      menuImages[currentMenuFullscreenIndex].src;
  } else if (activeGroup === 'gallery') {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateGalleryImage();
  }
}

#fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  #fullscreen-overlay img {
    max-width: 90%;
    max-height: 90%;
  }
  
  #fullscreen-overlay button {
    background: none;
    border: none;
    color: white;
    font-size: 3rem;
    margin: 0 2rem;
    cursor: pointer;
  }
  