// ══════════════════════════════════════════════
//  Main
// ══════════════════════════════════════════════

// On attend que la page soit chargé entierement avant d'interagir
document.addEventListener("DOMContentLoaded", async () => {
  listenToClickOnAddListModal();
  listenToClickOnModalClosingElements();
  await fetchAndDisplayLists();
});

// ══════════════════════════════════════════════
//  EventListeners
// ══════════════════════════════════════════════

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

function addListToListsContainer(listData) {
  // Pour chaque liste :
  listData.forEach((list) => {
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
  });
}

async function getLists() {
  const httpResponse = await fetch("http://localhost:3000/api/lists"); // on récupère une Response
  const data = await httpResponse.json(); // on transforme le corps de la réponse (JSON) en Objet JS
  return data;
}

async function fetchAndDisplayLists() {
  const lists = await getLists();
  addListToListsContainer(lists);
}
