import {
  listenToClickOnAddListModal,
  listenToSubmitOnAddListForm,
  fetchAndDisplayLists,
  listenToSubmitOnEditListForm,
  listenToSubmitOnDeleteListForm,
} from "./list.module.js";


import { listenToClickOnModalClosingElements } from "./utils.js";
document.addEventListener("DOMContentLoaded", async () => {
  listenToClickOnAddListModal();
  listenToClickOnModalClosingElements();
  listenToSubmitOnAddListForm();
  listenToSubmitOnEditListForm();
  listenToSubmitOnDeleteListForm();

  await fetchAndDisplayLists();
});
