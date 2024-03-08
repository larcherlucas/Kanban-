import { baseApiUrl } from "./config.js";

export async function createList(jsonData) {
  // Ici on doit faire une requete POST à l'API pour la creation d'une nouvelle liste
  const httpResponse = await fetch(`${baseApiUrl}/lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonData),
  });

  // Le serveur me retourne la nouvelle liste
  const data = await httpResponse.json();
  return data;
}

export async function getLists() {
  const httpResponse = await fetch(`${baseApiUrl}/lists`); // on récupère une Response
  const data = await httpResponse.json(); // on transforme le corps de la réponse (JSON) en Objet JS
  return data;
}
