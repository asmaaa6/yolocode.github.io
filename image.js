
const slideshows = {
    'slideshow1': { currentIndex: 1, intervalId: null },
    'slideshow2': { currentIndex: 1, intervalId: null },
    'slideshow3' : {currentIndex: 1 , intervalId: null}, 
    'slideshow4': {currentIndex: 1, intervalId: null },
    'slideshow5': {currentIndex: 1, intervalId: null },
    'slideshow6': {currentIndex: 1, intervalId: null },
    'slideshow7': {currentIndex:1 , intervalId: null } , 
    'slideshow8': {currentIndex: 1, intervalId: null },
    'slideshow9': {currentIndex : 1 , intervalId : null }, 
    'slideshow10': {currentIndex : 1 , intervalId : null }, 
    'slideshow11': {currentIndex : 1 , intervalId : null }, 
    'slideshow12': {currentIndex : 1 , intervalId : null }, 
    'slideshow13': {currentIndex : 1 , intervalId : null }, 
    'slideshow14': {currentIndex : 1 , intervalId : null }, 
    'slideshow15': {currentIndex : 1 , intervalId : null }, 
    'slideshow16': {currentIndex : 1 , intervalId : null }, 
    



   
};


document.addEventListener('DOMContentLoaded', () => {
  Object.keys(slideshows).forEach(id => {
    showSlides(slideshows[id].currentIndex, id);
    startAutoSlide(id);
  });

 


  updateCartCounter();


  
  document.querySelectorAll(".ajouter-au-panier").forEach(button => {
    button.addEventListener("click", function() {
      const productCard = this.closest('.column');
      const reference = productCard.querySelector('.ref-produit').textContent.trim();
      const priceText = productCard.querySelector('.prix-produit').textContent;
      const price = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
      const nom = productCard.querySelector('.ref-produit').textContent.trim();
      const image = productCard.querySelector('.produit-img').src;

      addToCart(reference, price, 1, nom, image);
    });
  });


  const slideshowContainers = document.querySelectorAll('.animph');
  slideshowContainers.forEach(contenu => {
    const id = contenu.id;
    contenu.addEventListener('mouseenter', () => clearInterval(slideshows[id].intervalId));
    contenu.addEventListener('mouseleave', () => startAutoSlide(id));
  });
});

function updateCartCounter() {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  const totalQuantite = panier.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelectorAll('#compteur, #compteur-panier').forEach(el => {
    if (el) el.textContent = totalQuantite;
  });
}





function startAutoSlide(slideshowId) {
  if (slideshows[slideshowId].intervalId) clearInterval(slideshows[slideshowId].intervalId);
  slideshows[slideshowId].intervalId = setInterval(() => changeSlide(1, slideshowId), 4000);
}
function resetAutoSlide(slideshowId) { startAutoSlide(slideshowId); }
function changeSlide(n, slideshowId) {
  showSlides(slideshows[slideshowId].currentIndex += n, slideshowId);
  resetAutoSlide(slideshowId);
}
function currentSlide(n, slideshowId) {
  showSlides(slideshows[slideshowId].currentIndex = n, slideshowId);
  resetAutoSlide(slideshowId);
}
function showSlides(n, slideshowId) {
  const slides = document.querySelectorAll(`#${slideshowId} .slide`);

  const dots = document.querySelectorAll(`#dots${slideshowId.replace('slideshow', '')} .dot`);

  if (n > slides.length) slideshows[slideshowId].currentIndex = 1;

  if (n < 1) slideshows[slideshowId].currentIndex = slides.length;
  
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active-dot"));
  const index = slideshows[slideshowId].currentIndex - 1;
  if (slides[index]) slides[index].classList.add("active");
  if (dots[index]) dots[index].classList.add("active-dot");
}

// pANIER 
function addToCart(reference, price, quantity, nom, image) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  const index = panier.findIndex(item => item.reference === reference);
  if (index !== -1) {
    panier[index].quantity += quantity;
  } else {
    panier.push({ reference, price, quantity, nom, image });
  }
  localStorage.setItem('panier', JSON.stringify(panier));
  updateCartCounter();
  showMessage(`Produit ${nom} ajouté au panier !`, 'success');
}





function showMessage(message, type = 'info') {
  let messageElement = document.createElement('div');
  messageElement.className = `message message-${type}`;
  messageElement.textContent = message;
  document.body.appendChild(messageElement);
  setTimeout(() => messageElement.classList.add('visible'), 10);
  setTimeout(() => {
    messageElement.classList.remove('visible');
    setTimeout(() => messageElement.remove(), 500);
  }, 3000);
}


  
