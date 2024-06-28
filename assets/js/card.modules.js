import {
  closeActiveModal,
  displayErrorMessage,
  displayToast,
} from "./utils.js";
  
import { createCard, editCard, deleteCard } from "./api.js";

import { addListToListsContainer } from "./list.module.js";
export function listenToSubmitOnAddCardForm() {
  const formElem = document.getElementById("add-card-form");
  formElem.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const formData = new FormData(formElem);
    const jsonData = Object.fromEntries(formData);
    const newList = await createCard(jsonData);
    if (!newList) {
      displayErrorMessage("Erreur lors de la creation");
      return;
    }
    addListToListsContainer(newList);
    closeActiveModal();
    formElem.reset();
    displayToast("Carte créée");
  });
}

export function listenToClickOnAddListModal() {
  const modalElem = document.getElementById("add-card-modal");
  const openModalBtn = document.getElementById("add-card-button");
  openModalBtn.addEventListener("click", () => {
    modalElem.classList.add("is-active");
  });
}
  
export function listenToSubmitOnEditListForm() {
  const editCardForm = document.getElementById("edit-card-form");
  editCardForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Submited !");
    const formData = new FormData(editCardForm);
    const jsonFormData = Object.fromEntries(formData);
    const listId = document.getElementById("edit-card-modal").dataset.listId; 
    const editedCard = await editCard(listId, jsonFormData);
  
    if (!editedCard) {
      displayErrorMessage();
      return;
    }
    const editedCardElem = document.getElementById(`card-${cardId}`);
    editedCardElem.querySelector('[slot="card-content"]').textContent =
    editedCard.content;
    closeActiveModal();
    editCardForm.reset();
    displayToast("Liste modifiée");
  
  
  });
}