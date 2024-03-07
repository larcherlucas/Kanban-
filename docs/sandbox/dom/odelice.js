// ===== REVISION DU DOM =====

/*
- querySelector
- querySelectorAll
- addEventListener
- createElement
- classList
- style
*/

/*
- <template>
  - cloner une template
  - selecteur par attribut slot
*/

// ===== Récupérer un élément du DOM =====

// On peut récuperer un element par son ID avec document.getElementById
const titleById = document.getElementById("title");
//console.log(titleById);

// On peut récuperer un element avec un selecter CSS : document.querySelector
const titleByQuery = document.querySelector(".title");

// ====== Modifier le style d'un élément =====
// Par exemple passer le background color du titre en rouge :

titleById.style.backgroundColor = "#FF0000";
titleById.style.fontSize = "45px";
titleById.style.color = "#00FF00";

// ====== Ajouter une classe sur un élément
// Mini exo souligné le titre en ajoutant la classe underline
titleById.classList.add("underline");
titleById.classList.remove("underline");

// toggle permet d'enlever ou d'ajouter la classe en fonction de si elle est deja presente ou non
titleById.classList.toggle("underline");

// ====== Réagir à un évènement ======

// Faire un console.log("Clicked !") quand j'appuie sur le bouton "Cliquer ici"
// Etape 1 : Je récupere l'element en question
const btnElem = document.querySelector(".button");
btnElem.addEventListener("click", () => {
  console.log("Clicked !");

  // Quand je clique sur le bouton changer le texte du bouton en "Clicked !"
  btnElem.textContent = "Clicked !";
});

// ===== Create Element ====

const fruits = [
  { name: "kiwi", unitPrice: 1, quantity: 6 },
  { name: "banane", unitPrice: 0.25, quantity: 4 },
  { name: "durian", unitPrice: 20, quantity: 1 },
  { name: "pommes", unitPrice: 0.5, quantity: 3 },
];

// Le but du jeux :
// Construire en javascript un <li> par fruit (juste le name) dans le <ul id="articles-list">

// Etape 1 : Vérifier que je sache bien ajouté un <li> au <ul>
// 1.1 : On créer un <li> avec document.createElement
// 1.2 : On modifie le textContent du <li> avec un nom de fruit
// 1.3 : J'ajoute le <li> dans le <ul> :
// 1.3.1 : Je récupere le <ul> avec un getElementById
// 1.3.2 : J'ajoute le <li> au <ul> avec appendChild

const liElem = document.createElement("li");
liElem.textContent = "Test";

const ulElem = document.getElementById("fruits-list");
ulElem.appendChild(liElem);

// Etape 2 : Faire une boucle des fruits
// Boucler sur fruits et faire l'etape 1 pour chaque fruit
fruits.forEach((fruit) => {
  const liElem = document.createElement("li");
  liElem.textContent = fruit.name;

  const ulElem = document.getElementById("fruits-list");
  ulElem.appendChild(liElem);
});

// ====== TEMPLATE ======

// Le principe est de venir copier une structure HTML
// De modifier certain elements, avant de l'ajouter dans le DOM

// Etape 1 : Je fait un clone du template
const templateElem = document.getElementById("fruit-template");
const cloneElem = templateElem.content.cloneNode(true);

// Etape 2 : Je modifie le clone en fonction de mes besoins
cloneElem.querySelector('[slot="fruit-name"]').textContent = "Test";
cloneElem.querySelector('[slot="fruit-quantity"]').textContent = 1;
cloneElem.querySelector('[slot="fruit-price"]').textContent = 0;

// Etape 3 : J'ajoute le clone au DOM
const articlesContainerElem = document.getElementById("articles-list");
articlesContainerElem.appendChild(cloneElem);

// ===== TEMPLATE pour chaque fruit !

// Ajouter un article par fruit dans la div "articles-list"

// ====== Selection de plusieurs éléments d'un seul coup ======
