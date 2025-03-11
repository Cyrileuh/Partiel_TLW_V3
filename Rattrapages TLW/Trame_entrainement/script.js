async function importerDonnees() {
    try {
        // 🔹 Étape 1 : Faire une requête à l'API
        const url = "https://api.scryfall.com/cards/search?q=e:ltr&format=json&order=set&unique=prints"; // Remplace par ton API
        const response = await fetch(url); // Appel de l'API
        const data = await response.json(); // Convertir la réponse en JSON

        console.log("Données reçues :", data); // Affiche les données dans la console pour vérifier

        // 🔹 Étape 2 : Vérification des données
        if (!data.data || !Array.isArray(data.data)) {
            console.error("Format de données incorrect !");
            return;
        }

        // 🔹 Étape 3 : Récupérer les éléments HTML
        const conteneur = document.getElementById("conteneur");
        const template = document.getElementById("element-template");

        // 🔹 Étape 4 : Parcourir les données et créer des éléments dynamiquement
        data.data.forEach(item => {
            const clone = template.content.cloneNode(true); // Cloner le template

            // Modifier les éléments du template avec les données de l'API
            const imgElement = clone.querySelector(".element-img");
            const nomElement = clone.querySelector(".element-nom");

            imgElement.src = item.image_uris ? item.image_uris.normal : "placeholder.jpg"; // Image
            imgElement.alt = item.name; // Texte alternatif
            nomElement.textContent = item.name; // Nom ou titre

            // 🔹 Étape 5 : Ajouter l'élément au conteneur
            conteneur.appendChild(clone);
        });

    } catch (error) {
        console.error("Erreur lors de l'importation des données :", error);
    }
}
