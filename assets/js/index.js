// ══════════════════════════════════════════════
//  Main
// ══════════════════════════════════════════════

import {
  listenToClickOnAddListModal,
  listenToSubmitOnAddListForm,
  fetchAndDisplayLists,
  listenToSubmitOnEditListForm,
  listenToSubmitOnDeleteListForm,
} from "./list.module.js";
import { listenToClickOnModalClosingElements } from "./utils.js";

// On attend que la page soit chargé entierement avant d'interagir
document.addEventListener("DOMContentLoaded", async () => {
  listenToClickOnAddListModal();
  listenToClickOnModalClosingElements();
  listenToSubmitOnAddListForm();
  listenToSubmitOnEditListForm();
  listenToSubmitOnDeleteListForm();
  await fetchAndDisplayLists();
});
