import { baseApiUrl } from "./config.js";

export async function getLists() {
  try {
    const httpResponse = await fetch(`${baseApiUrl}/lists`); 
    if (!httpResponse.ok) {
      throw new Error("Une erreur est survenue");
    }
    const data = await httpResponse.json(); 
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function createList(jsonData) {
  try {
    const httpResponse = await fetch(`${baseApiUrl}/lists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    });

    console.log(httpResponse);
    if (!httpResponse.ok) {
      throw new Error("Une erreur est survenue");
    }
    const data = await httpResponse.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function editList(listId, listData) {
  try {
    const url = `${baseApiUrl}/lists/${listId}`;
    const httpResponse = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listData),
    });

    if (!httpResponse.ok) {
      return null;
    }

    const httpJsonData = await httpResponse.json();
    return httpJsonData;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteList(listId) {
  try {
    const httpResponse = await fetch(`${baseApiUrl}/lists/${listId}`, {
      method: "DELETE",
    });

    return httpResponse.ok; 
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function editCard(cardId, cardData) {
  try {
    const url = `${baseApiUrl}/cards/${cardId}`;
    const httpResponse = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    });

    if (!httpResponse.ok) {
      return null;
    }

    const httpJsonData = await httpResponse.json();
    return httpJsonData;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteCard(cardId) {
  try {
    const httpResponse = await fetch(`${baseApiUrl}/cards/${cardId}`, {
      method: "DELETE",
    });

    return httpResponse.ok; 
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function createCard(jsonData) {
  try {
    const httpResponse = await fetch(`${baseApiUrl}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    });

    console.log(httpResponse);
    if (!httpResponse.ok) {
      throw new Error("Une erreur est survenue");
    }
    const data = await httpResponse.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
