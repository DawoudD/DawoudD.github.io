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

/*****************************************
 * GALLERY SECTION (Optional Use)
 *****************************************/
const galleryImages = [
  "https://via.placeholder.com/1920x1080/FF5733/ffffff?text=Dish+1",
  "https://via.placeholder.com/1920x1080/33FF57/ffffff?text=Dish+2",
  "https://via.placeholder.com/1920x1080/3357FF/ffffff?text=Dish+3"
];

let currentIndex = 0;

function updateGalleryImage() {
  const fullscreenImage = document.getElementById("fullscreen-gallery-image");
  fullscreenImage.style.opacity = 0;
  setTimeout(() => {
    fullscreenImage.src = galleryImages[currentIndex];
    fullscreenImage.style.opacity = 1;
  }, 300);
}

function nextGalleryImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateGalleryImage();
}

function prevGalleryImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateGalleryImage();
}

function closeGallery() {
  document.getElementById("gallery").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  updateGalleryImage();
});
