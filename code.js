
const images = document.querySelectorAll('.galerie img.image');
const mins = document.querySelectorAll('.min');
const overlayDark = document.querySelector('.overlay-dark');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;
let autoChangeInterval;

images[0].classList.add('active');

function showImage(index) {
  const currentImage = images[currentIndex];
  const nextImage = images[index];

  images.forEach(img => {
    img.classList.remove('active');
    img.style.opacity = 0;
    img.style.transform = 'translateX(0)';
  });

  mins.forEach((thumb, idx) => {
    thumb.classList.toggle('active', idx === index);
  });

  currentImage.style.transform = 'translateX(100%)';
  currentImage.style.opacity = 0;

  nextImage.style.transform = 'translateX(-100%)';
  nextImage.style.opacity = 0;

  overlayDark.classList.add('active');

  setTimeout(() => {
    nextImage.classList.add('active');
    nextImage.style.transform = 'translateX(0)';
    nextImage.style.opacity = 1;

    setTimeout(() => {
      overlayDark.classList.remove('active');
    }, 1500);
  }, 100);

  currentIndex = index;
}

function showImageByIndex(index) {
  clearInterval(autoChangeInterval);
  showImage(index);
  resetAutoChange();
}

function resetAutoChange() {
  clearInterval(autoChangeInterval);
  autoChangeInterval = setInterval(autoChangeImage, 30000);
}

prevButton.addEventListener('click', () => {
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  showImageByIndex(prevIndex);
});

nextButton.addEventListener('click', () => {
  const nextIndex = (currentIndex + 1) % images.length;
  showImageByIndex(nextIndex);
});

function autoChangeImage() {
  const nextIndex = (currentIndex + 1) % images.length;
  showImage(nextIndex);
}

autoChangeInterval = setInterval(autoChangeImage, 30000);

document.querySelector('.bouton-menu').addEventListener('click', function(e) {
  e.preventDefault();
  const contenuMenu = document.querySelector('.contenu-menu');
  contenuMenu.style.display = contenuMenu.style.display === 'block' ? 'none' : 'block';
});




document.getElementById('current-year').textContent = new Date().getFullYear();



document.querySelectorAll('.image').forEach(image => {
image.addEventListener('click', function() {

});



  document.addEventListener('DOMContentLoaded', () => {
    const compteur = localStorage.getItem('panierCount') || 0;
    document.getElementById('compteur-panier').textContent = compteur;
  });

  function ajouterAuPanier() {
    let compteur = parseInt(localStorage.getItem('panierCount')) || 0;
    compteur += 1;
    localStorage.setItem('panierCount', compteur);
    document.getElementById('compteur-panier').textContent = compteur;
  }




  

  


});






