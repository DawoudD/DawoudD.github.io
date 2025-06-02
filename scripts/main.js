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

function closeFullscreen() {
    document.getElementById('fullscreen-overlay').style.display = 'none';
  }
  
  function nextFullscreenImage() {
    currentMenuFullscreenIndex = (currentMenuFullscreenIndex + 1) % menuImages.length;
    document.getElementById('fullscreen-image').src = menuImages[currentMenuFullscreenIndex].src;
  }
  
  function prevFullscreenImage() {
    currentMenuFullscreenIndex =
      (currentMenuFullscreenIndex - 1 + menuImages.length) % menuImages.length;
    document.getElementById('fullscreen-image').src = menuImages[currentMenuFullscreenIndex].src;

}
