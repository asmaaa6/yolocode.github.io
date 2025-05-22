document.addEventListener('DOMContentLoaded', () => {
  afficherPanier();
  updateCartCounter();
});

// Affiche les articles du panier
function afficherPanier() {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  const tbody = document.getElementById('liste-articles');
  const sectionVide = document.getElementById('panier-vide');
  const sectionPanier = document.querySelector('.conteneur-panier');
  tbody.innerHTML = '';

  if (panier.length === 0) {
    sectionVide.style.display = 'block';
    sectionPanier.style.display = 'none';
    return;
  }

  let sousTotal = 0;
  panier.forEach((article, index) => {
    const ligne = document.createElement('tr');

    const totalArticle = article.price * article.quantity;
    sousTotal += totalArticle;

    ligne.innerHTML = `
      <td>
        <img src="${article.image}" alt="${article.nom}" style="width: 60px; height: auto;" />
        <span>${article.nom}</span>
      </td>
      <td>${article.price.toFixed(2)} €</td>
      <td>${article.quantity}</td>
      <td>${totalArticle.toFixed(2)} €</td>
      <td>
        <button onclick="supprimerArticle('${article.reference}')" class="bouton bouton-rouge" aria-label="Supprimer l'article">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    tbody.appendChild(ligne);
  });

  const fraisLivraison = panier.length > 0 ? 5.0 : 0.0;
  const total = sousTotal + fraisLivraison;

  document.getElementById('sous-total').textContent = `${sousTotal.toFixed(2)} €`;
  document.getElementById('frais-livraison').textContent = `${fraisLivraison.toFixed(2)} €`;
  document.getElementById('total-panier').innerHTML = `<strong>${total.toFixed(2)} €</strong>`;
}

// Supprimer un seul article
function supprimerArticle(reference) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  panier = panier.filter(item => item.reference !== reference);
  localStorage.setItem('panier', JSON.stringify(panier));
  afficherPanier();
  updateCartCounter();
}

// Vider le panier avec confirmation modale
function viderPanier() {
  document.getElementById('modal-confirmation').style.display = 'block';
}

function fermerModal() {
  document.getElementById('modal-confirmation').style.display = 'none';
}

function confirmerViderPanier() {
  localStorage.removeItem('panier');
  fermerModal();
  afficherPanier();
  updateCartCounter();
}

// Mise à jour du compteur
function updateCartCounter() {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  const total = panier.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('compteur-panier').textContent = total;
}
