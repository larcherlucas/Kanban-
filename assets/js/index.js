const baseApiUrl = "http://localhost:3000/api";

// ══════════════════════════════════════════════
//  Main
// ══════════════════════════════════════════════

// On attend que la page soit chargé entierement avant d'interagir
document.addEventListener("DOMContentLoaded", async () => {
  listenToClickOnAddListModal();
  listenToClickOnModalClosingElements();
  listenToSubmitOnAddListForm();
  await fetchAndDisplayLists();
});

// ══════════════════════════════════════════════
//  EventListeners
// ══════════════════════════════════════════════

function listenToSubmitOnAddListForm() {
  // Le but : écouter la validation du formulaire et console.log les données
  // On récuper l'element <form> de la modal
  const formElem = document.getElementById("add-list-form");

  // On ajoute un eventListener au submit du form
  formElem.addEventListener("submit", async (event) => {
    event.preventDefault(); // ON empeche le reload de la page
    console.log("Submited");

    // On récupere les données du formulaire gace a FormData
    const formData = new FormData(formElem);
    const jsonData = Object.fromEntries(formData);

    // On ferme la modal
    closeActiveModal();

    // On reset le formulaire
    formElem.reset();

    // On fait l'appel API pour créer la nouvelle list
    const newList = await createList(jsonData);

    // On ajoute la nouvelle liste au DOM
    addListToListsContainer(newList);
  });
}

function listenToClickOnAddListModal() {
  // On récuper la modal
  const modalElem = document.getElementById("add-list-modal");

  // - sélectionner le bouton → `querySelector()`
  const openModalBtn = document.getElementById("add-list-btn");
  // - écouter le click sur le bouton, et en cas de clic → `addEventListener()`
  openModalBtn.addEventListener("click", () => {
    //   - lui ajouter la classe 'is-active' → `classList.add()`
    modalElem.classList.add("is-active");
  });
}

function listenToClickOnModalClosingElements() {
  // Je récuper tout les elements qui sont sensé déclancher la fermetur
  const closingModalElems = document.querySelectorAll(
    '[data-action="close-modal"]'
  );

  // Pour chaque element je hook la fonction de fermeture des modals
  closingModalElems.forEach((elem) => {
    elem.addEventListener("click", closeActiveModal);
  });
}

// ══════════════════════════════════════════════
//  Fonctions
// ══════════════════════════════════════════════

function closeActiveModal() {
  // On cherche la modale ouverte, donc qui porte les classes "modal" et "is-active"
  const activeModalElem = document.querySelector(".modal.is-active");

  // Et on la fermer
  activeModalElem.classList.remove("is-active");
}

function addListToListsContainer(list) {
  // - cloner le template
  const templateElem = document.getElementById("list-template");
  const cloneElem = templateElem.content.cloneNode(true);

  // - changer le contenu de l'élément avec le slot `list-title` (du clone) par le titre de la liste récupérée
  cloneElem.querySelector('[slot="list-title"]').textContent = list.title;

  // - changer l'ID de l'élément avec le slot `slot-id` (du clone) par l'ID de la liste récupérée
  cloneElem
    .querySelector('[slot="list-id"]')
    .setAttribute("id", `list-${list.id}`);

  // - sélectionner l'élément conteneur des listes
  const listContainer = document.getElementById("lists-container");

  // - insérer le clone dans le conteneur
  listContainer.appendChild(cloneElem);
}

async function getLists() {
  const httpResponse = await fetch(`${baseApiUrl}/lists`); // on récupère une Response
  const data = await httpResponse.json(); // on transforme le corps de la réponse (JSON) en Objet JS
  return data;
}

async function fetchAndDisplayLists() {
  const lists = await getLists();
  lists.forEach((list) => {
    addListToListsContainer(list);
  });
}

async function createList(jsonData) {
  // Ici on doit faire une requete POST à l'API pour la creation d'une nouvelle liste
  const httpResponse = await fetch(`${baseApiUrl}/lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonData),
  });
  console.log("response server :");
  console.log(httpResponse);

  const data = await httpResponse.json();
  return data;
}
