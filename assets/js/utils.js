export function closeActiveModal() {
  // On cherche la modale ouverte, donc qui porte les classes "modal" et "is-active"
  const activeModalElem = document.querySelector(".modal.is-active");

  // Et on la fermer
  activeModalElem.classList.remove("is-active");
}

export function listenToClickOnModalClosingElements() {
  // Je récuper tout les elements qui sont sensé déclancher la fermetur
  const closingModalElems = document.querySelectorAll(
    '[data-action="close-modal"]'
  );

  // Pour chaque element je hook la fonction de fermeture des modals
  closingModalElems.forEach((elem) => {
    elem.addEventListener("click", closeActiveModal);
  });
}