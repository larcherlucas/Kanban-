import {
  closeActiveModal,
  displayErrorMessage,
  displayToast,
} from "./utils.js";

import { getLists, createList, editList, deleteList } from "./api.js";

export function listenToSubmitOnAddListForm() {
  const formElem = document.getElementById("add-list-form");
  formElem.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const formData = new FormData(formElem);
    const jsonData = Object.fromEntries(formData);
    const newList = await createList(jsonData);
    if (!newList) {
      displayErrorMessage("Erreur lors de la creation");
      return;
    }
    addListToListsContainer(newList);
    closeActiveModal();
    formElem.reset();
    displayToast("List créée");
  });
}

export function listenToClickOnAddListModal() {
  const modalElem = document.getElementById("add-list-modal");
  const openModalBtn = document.getElementById("add-list-btn");
  openModalBtn.addEventListener("click", () => {
    modalElem.classList.add("is-active");
  });
}

export function addListToListsContainer(list) {
  const templateElem = document.getElementById("list-template");
  const cloneElem = templateElem.content.cloneNode(true);
  cloneElem.querySelector('[slot="list-title"]').textContent = list.title;
  cloneElem
    .querySelector('[slot="list-id"]')
    .setAttribute("id", `list-${list.id}`);
  const cardsContainer = cloneElem.querySelector('[slot="list-content"]');
  list.cards.forEach(card => {
    const cardTemplate = document.getElementById("card-template").content.cloneNode(true);
    cardTemplate.querySelector('[slot="card-content"]').textContent = card.content;
    cardsContainer.appendChild(cardTemplate);
  });
  const updatedBtn = cloneElem.querySelector('[slot="updated-card-button"]');
  updatedBtn.addEventListener("click", () => {
    console.log("update carte");
    const updatedCardModalElement = document.getElementById('edit-card-modal');
    updatedCardModalElement.classList.add("is-active");
  });
  const removeBtn = cloneElem.querySelector('[slot="remove-card-button"]');
  removeBtn.addEventListener("click", () => {
    console.log("remove carte");
    const removeCardModalElement = document.getElementById('delete-card-modal');
    removeCardModalElement.classList.add("is-active");
  });
  const editBtnElem = cloneElem.querySelector('[slot="edit-card-button"]');
  editBtnElem.addEventListener("click", () => {
    const editListModalElem = document.getElementById("edit-list-modal");
    editListModalElem.dataset.listId = list.id;
    editListModalElem.classList.add("is-active");
  });
  const deleteBtnElem = cloneElem.querySelector('[slot="delete-card-button"]');
  deleteBtnElem.addEventListener("click", () => {
    const deleteListModalElem = document.getElementById("delete-list-modal");
    deleteListModalElem.dataset.listId = list.id;
    deleteListModalElem.classList.add("is-active");
  });
  const listContainer = document.getElementById("lists-container");
  listContainer.appendChild(cloneElem); 
}

export function listenToSubmitOnDeleteListForm() {
  const deleteListForm = document.getElementById("delete-list-form");
  deleteListForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const deleteModalElem = document.getElementById("delete-list-modal");
    const listId = deleteModalElem.dataset.listId;
    const deletedList = await deleteList(listId);
    if (!deletedList) {
      displayErrorMessage("Impossible de supprimer la liste");
    }
    const deletedListElem = document.getElementById(`list-${listId}`);
    deletedListElem.remove();
    closeActiveModal();
  });
}
export function listenToSubmitOnEditListForm() {
  const editListForm = document.getElementById("edit-list-form");
  editListForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Submited !");
    const formData = new FormData(editListForm);
    const jsonFormData = Object.fromEntries(formData);
    const listId = document.getElementById("edit-list-modal").dataset.listId; 
    const editedList = await editList(listId, jsonFormData);

    if (!editedList) {
      displayErrorMessage();
      return;
    }
    const editedListElem = document.getElementById(`list-${listId}`);
    editedListElem.querySelector('[slot="list-title"]').textContent =
      editedList.title;
    closeActiveModal();
    editListForm.reset();
    displayToast("Liste modifiée");


  });
}

export async function fetchAndDisplayLists() {
  const lists = await getLists();
  if (!lists) {
    displayErrorMessage("Impossible de récuperer les listes");
  }

  lists.forEach((list) => {
    addListToListsContainer(list);
  });
}
