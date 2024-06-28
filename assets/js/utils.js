import { toast } from "bulma-toast"; 
export function closeActiveModal() {
  const activeModalElem = document.querySelector(".modal.is-active");
  activeModalElem.classList.remove("is-active");
}

export function listenToClickOnModalClosingElements() {
  const closingModalElems = document.querySelectorAll(
    '[data-action="close-modal"]'
  );
  closingModalElems.forEach((elem) => {
    elem.addEventListener("click", closeActiveModal);
  });
}

export function displayToast(msg) {
  toast({
    message: msg,
    type: "is-success",
    dismissible: true,
    position: "top-right",
    animate: { in: "fadeIn", out: "fadeOut" },
  });
}

export function displayErrorMessage(msg) {
  alert(msg);
}
