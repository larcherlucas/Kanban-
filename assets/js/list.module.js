import {
  closeActiveModal,
  displayErrorMessage,
  displayToast,
} from "./utils.js";

import { getLists, createList, editList } from "./api.js";
import { baseApiUrl } from "./config.js";

export function listenToSubmitOnAddListForm() {
  // Le but : écouter la validation du formulaire et console.log les données
  // On récuper l'element <form> de la modal
  const formElem = document.getElementById("add-list-form");

  // On ajoute un eventListener au submit du form
  formElem.addEventListener("submit", async (event) => {
    event.preventDefault(); // ON empeche le reload de la page
    // On récupere les données du formulaire gace a FormData
    const formData = new FormData(formElem);
    const jsonData = Object.fromEntries(formData);
    // On fait l'appel API pour créer la nouvelle list
    const newList = await createList(jsonData);

    // Je vérifie que tout s'est bien passé
    if (!newList) {
      displayErrorMessage("Erreur lors de la creation");
      return;
    }

    // On ajoute la nouvelle liste au DOM
    addListToListsContainer(newList);

    // On ferme la modal
    closeActiveModal();

    // On reset le formulaire
    formElem.reset();

    // On affiche un toast de succes
    displayToast("List créée");
  });
}

export function listenToClickOnAddListModal() {
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

export function addListToListsContainer(list) {
  // - cloner le template
  const templateElem = document.getElementById("list-template");
  const cloneElem = templateElem.content.cloneNode(true);

  // - changer le contenu de l'élément avec le slot `list-title` (du clone) par le titre de la liste récupérée
  cloneElem.querySelector('[slot="list-title"]').textContent = list.title;

  // - changer l'ID de l'élément avec le slot `slot-id` (du clone) par l'ID de la liste récupérée
  cloneElem
    .querySelector('[slot="list-id"]')
    .setAttribute("id", `list-${list.id}`);

  // J'ajoute les ecouteurs d'evenement de ma liste
  // Ouverture de la modal d'edition
  const editBtnElem = cloneElem.querySelector('[slot="edit-card-button"]');
  editBtnElem.addEventListener("click", () => {
    // Je veux ouvrire la modal
    // Je récupere l'element de la modal
    const editListModalElem = document.getElementById("edit-list-modal");

    // Je lui ajoute dans les dataset l'ID de la liste à editer
    editListModalElem.dataset.listId = list.id;

    // J'ouvre la modal en lui ajoutant la classe "is-active"
    editListModalElem.classList.add("is-active");
  });

  // - sélectionner l'élément conteneur des listes
  const listContainer = document.getElementById("lists-container");

  // - insérer le clone dans le conteneur
  listContainer.appendChild(cloneElem); // prepend c'est comme appendChild mais ça positionne avant
}

export function listenToSubmitOnEditListForm() {
  // Sélectionner le formulaire d'édition de liste
  const editListForm = document.getElementById("edit-list-form");

  // Écouter l'évènement `submit` sur ce formulaire, auquel cas :

  editListForm.addEventListener("submit", async (event) => {
    // - empêcher le comportement par défaut du formulaire
    event.preventDefault();
    console.log("Submited !");

    // - récupérer les données du formulaire (le nouveau titre)
    const formData = new FormData(editListForm);
    const jsonFormData = Object.fromEntries(formData);

    // - récupérer l'ID de la liste à modifier dans les dataset de la modale
    const listId = document.getElementById("edit-list-modal").dataset.listId;

    // - PATCH `/lists/:listId` avec comme body { "title": "..." }
    // - récupérer le résultat de la requête PATCH, et en cas de succès
    const editedList = await editList(listId, jsonFormData);

    if (!editedList) {
      displayErrorMessage();
      return;
    }

    // - sélectionner la liste du DOM correspondant au bon ID
    const editedListElem = document.getElementById(`list-${listId}`);

    // - modifier le contenu de l'élément avec le slot `list-title` avec le nouveau titre choisi
    editedListElem.querySelector('[slot="list-title"]').textContent =
      editedList.title;

    // - fermer la modale
    closeActiveModal();

    // - reset le formulaire
    editListForm.reset();

    // - Envoyer un message de succès a l'utilisateur
    displayToast("Liste modifiée");

    // Festoyer ! Tres fort !
    // \o/
  });
}

export async function fetchAndDisplayLists() {
  const lists = await getLists();

  // Si on as un probleme au niveau du call API on affiche une erreur
  if (!lists) {
    displayErrorMessage("Impossible de récuperer les listes");
  }

  lists.forEach((list) => {
    addListToListsContainer(list);
  });
}
