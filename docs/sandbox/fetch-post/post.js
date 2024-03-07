// On récupere la liste des POSTS

//getAllPosts();

async function getAllPosts() {
  const httpResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const jsonData = await httpResponse.json();

  console.log(jsonData);
}

// Comment je fait une requete POST avec de la data

// On veux transmettre cette donné à l'API
const data = {
  userId: 1,
  title: "test",
  body: "hello world",
};

// Pour ça, j'utilise encore fetch
const httpResponse = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST", // On fait une requette post
  headers: { "Content-Type": "application/json" }, // On va envoyer du JSON
  body: JSON.stringify(data), // Avec la data qu'on veux
});

console.log(httpResponse);

const jsonData = await httpResponse.json();

console.log(jsonData);
