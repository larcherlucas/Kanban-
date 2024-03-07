// Etape 1 : Je récupere la liste des regions grace à fetch
const httpResponse = await fetch("https://geo.api.gouv.fr/regions");
const jsonData = await httpResponse.json();

// Maintenant, je construit la liste des regions avec la data
// que j'ai reçu du serveur
jsonData.forEach((region) => {
  // Pour chaque region, je construit un <li>
  const regionElem = document.createElement("li");

  // Je modifie son nom
  regionElem.textContent = region.nom;

  // J'ajoute un ecouteur d'evenement au clic
  regionElem.addEventListener("click", async () => {
    // Je récupere la liste des departement correspondant
    const apiUrl = `https://geo.api.gouv.fr/regions/${region.code}/departements`;
    const httpResponse = await fetch(apiUrl);
    const jsonData = await httpResponse.json();

    // On vide la liste des départements
    document.getElementById("departements-list").textContent = "";

    // Je construit la liste des départements
    jsonData.forEach((departement) => {
      const depElem = document.createElement("li");
      depElem.textContent = departement.nom;
      document.getElementById("departements-list").appendChild(depElem);
    });
  });

  // J'ajoute les <li> dans le <ul>
  const regionContainer = document.getElementById("regions-list");
  regionContainer.appendChild(regionElem);
});
