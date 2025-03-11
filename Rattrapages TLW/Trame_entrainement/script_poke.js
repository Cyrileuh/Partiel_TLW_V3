document.addEventListener("DOMContentLoaded", () => {
    // Sélection du bouton et ajout d'un événement au clic
    document.getElementById("afficher-btn").addEventListener("click", afficherPokemons);
});

async function afficherPokemons() {
    try {
        // Vider le conteneur pour éviter l'ajout en double
        const conteneur = document.getElementById("conteneur");
        conteneur.innerHTML = "";

        // 🔹 Étape 1 : Récupération de la liste des Pokémon
        const url = "https://pokeapi.co/api/v2/pokemon?limit=10"; // 10 Pokémon
        const response = await fetch(url);
        const data = await response.json();

        console.log("Données reçues :", data); // Vérification

        // Vérification des données
        if (!data.results || !Array.isArray(data.results)) {
            console.error("Format de données incorrect !");
            return;
        }

        // Sélection du template
        const template = document.getElementById("pokemon-template");

        // 🔹 Étape 2 : Parcourir les Pokémon et récupérer leurs détails en français
        for (let pokemon of data.results) {
            const responseDetails = await fetch(pokemon.url);
            const details = await responseDetails.json();

            // 🔹 Récupérer le nom en français
            const responseSpecies = await fetch(details.species.url);
            const speciesData = await responseSpecies.json();
            const nomFrancais = speciesData.names.find(n => n.language.name === "fr").name;

            // 🔹 Traduction des types
            const typesFrancais = await Promise.all(details.types.map(async t => {
                const responseType = await fetch(t.type.url);
                const typeData = await responseType.json();
                return typeData.names.find(n => n.language.name === "fr").name;
            }));

            // Cloner le template
            const clone = template.content.cloneNode(true);

            // Sélection des éléments du clone
            const imgElement = clone.querySelector(".pokemon-img");
            const nomElement = clone.querySelector(".pokemon-nom");
            const typeElement = clone.querySelector(".pokemon-type");

            // Ajout des données de l'API
            imgElement.src = details.sprites.front_default; // Image du Pokémon
            imgElement.alt = nomFrancais;
            nomElement.textContent = nomFrancais.toUpperCase(); // Nom en majuscules
            typeElement.textContent = "Type : " + typesFrancais.join(", "); // Liste des types en français

            // Ajouter au conteneur
            conteneur.appendChild(clone);
        }
    } catch (error) {
        console.error("Erreur lors de l'importation des Pokémon :", error);
    }
}
