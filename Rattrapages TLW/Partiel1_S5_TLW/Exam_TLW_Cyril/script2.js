function parseMana(str) {
    return str.split(/\s*({\w*})\s*/g).filter(Boolean);
}


async function afficherCartes() {
    try {
        // Récupération des données de l'API
        let reponse = await fetch("https://api.scryfall.com/cards/search?q=e:ltr lang:fr&format=json&order=set&unique=prints");
        let donnees = await reponse.json(); // Convertir en objet JSON

        console.log(donnees); // Vérifie les données reçues dans la console

        // Sélection du conteneur où insérer les cartes
        let gridContainer = document.getElementById('grid-container');
        let template = document.getElementById('card-template');

        // Vérifie si les données existent et sont bien sous forme de tableau
        if (!donnees.data || !Array.isArray(donnees.data)) {
            console.error("Format de données incorrect !");
            return;
        }

        // Boucle sur chaque carte de l'API
        donnees.data.forEach(carte => {
            let clone = template.content.cloneNode(true); // Clone le template

            // Récupération des éléments à l'intérieur du template
            let imgElement = clone.querySelector(".card-img");
            let nomElement = clone.querySelector("#nom_carte");

            // Mise à jour des éléments avec les données de l'API
            imgElement.src = carte.image_uris ? carte.image_uris.normal : "placeholder.jpg"; // Image de la carte
            imgElement.alt = carte.name; // Nom en alt
            nomElement.textContent = carte.name; // Nom affiché

            // Ajout de la carte dans le conteneur
            gridContainer.appendChild(clone);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des cartes :", error);
    }
}

