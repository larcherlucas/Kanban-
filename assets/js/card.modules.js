import {
  closeActiveModal,
  displayErrorMessage,
  displayToast,
} from "./utils.js";
  
import { createCard, editCard, deleteCard } from "./api.js";

import { addListToListsContainer } from "./list.module.js";

/* IL FAUT IMPLEMENTER LE BUTTON NÉCESSAIRE */
export function listenToSubmitOnAddCardForm() {
  // Le but : écouter la validation du formulaire et console.log les données
  // On récuper l'element <form> de la modal
  const formElem = document.getElementById("add-card-form");
  
  // On ajoute un eventListener au submit du form
  formElem.addEventListener("submit", async (event) => {
    event.preventDefault(); // ON empeche le reload de la page
    // On récupere les données du formulaire gace a FormData
    const formData = new FormData(formElem);
    const jsonData = Object.fromEntries(formData);
    // On fait l'appel API pour créer la nouvelle list
    const newList = await createCard(jsonData);
  
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
    displayToast("Carte créée");
  });
}

export function listenToClickOnAddListModal() {
  // On récuper la modal
  const modalElem = document.getElementById("add-card-modal");
  
  // - sélectionner le bouton → `querySelector()`
  const openModalBtn = document.getElementById("add-card-button");
  // - écouter le click sur le bouton, et en cas de clic → `addEventListener()`
  openModalBtn.addEventListener("click", () => {
    //   - lui ajouter la classe 'is-active' → `classList.add()`
    modalElem.classList.add("is-active");
  });
}
  
export function listenToSubmitOnEditListForm() {
  // Sélectionner le formulaire d'édition de liste
  const editCardForm = document.getElementById("edit-card-form");
  
  // Écouter l'évènement `submit` sur ce formulaire, auquel cas :
  editCardForm.addEventListener("submit", async (event) => {
    // - empêcher le comportement par défaut du formulaire
    event.preventDefault();
    console.log("Submited !");
  
    // - récupérer les données du formulaire (le nouveau titre)
    const formData = new FormData(editCardForm);
    const jsonFormData = Object.fromEntries(formData);
  
    // - récupérer l'ID de la liste à modifier dans les dataset de la modale
    const listId = document.getElementById("edit-card-modal").dataset.listId; 
  
    // - PATCH `/lists/:listId` avec comme body { "title": "..." }
    // - récupérer le résultat de la requête PATCH, et en cas de succès
    const editedCard = await editCard(listId, jsonFormData);
  
    if (!editedCard) {
      displayErrorMessage();
      return;
    }
  
    // - sélectionner la liste du DOM correspondant au bon ID
    const editedCardElem = document.getElementById(`card-${cardId}`);
  
    // - modifier le contenu de l'élément avec le slot `list-title` avec le nouveau titre choisi
    editedCardElem.querySelector('[slot="card-content"]').textContent =
    editedCard.content;
  
    // - fermer la modale
    closeActiveModal();
  
    // - reset le formulaire
    editCardForm.reset();
  
    // - Envoyer un message de succès a l'utilisateur
    displayToast("Liste modifiée");
  
  
  });
}