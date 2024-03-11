import { baseApiUrl } from "./config.js";

export async function createList(jsonData) {
  try {
    // Ici on doit faire une requete POST à l'API pour la creation d'une nouvelle liste
    const httpResponse = await fetch(`${baseApiUrl}/lists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    });

    console.log(httpResponse);
    // Si le serveur nous répond qu'il y as eu un soucis
    if (!httpResponse.ok) {
      throw new Error("Une erreur est survenue");
    }

    // Le serveur me retourne la nouvelle liste
    const data = await httpResponse.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getLists() {
  try {
    const httpResponse = await fetch(`${baseApiUrl}/lists`); // on récupère une Response
    // Si le serveur nous répond qu'il y as eu un soucis
    if (!httpResponse.ok) {
      throw new Error("Une erreur est survenue");
    }
    const data = await httpResponse.json(); // on transforme le corps de la réponse (JSON) en Objet JS
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
