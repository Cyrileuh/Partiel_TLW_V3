const custom_UA = { "User-Agent": "CPE-Lyon-ETI-2024" };

async function recupererProduits() {
    try {
        const url = "https://world.openfoodfacts.org/api/v2/search?countries_tags_en=france&page_size=102&fields=code,product_name,image_small_url,nutriscore_grade,nova_group,ecoscore_grade,brands,quantity";
        const response = await fetch(url, { headers: custom_UA });
        const data = await response.json();

        console.log("Données reçues :", data);

        // Vérifier la validité des données
        if (!data.products || !Array.isArray(data.products)) {
            console.error("Format de données incorrect !");
            return;
        }

        // Sélection du conteneur des produits et du template
        const container = document.getElementById("products-container");
        const template = document.getElementById("product-template");

        // Boucle sur chaque produit
        data.products.forEach(produit => {
            const clone = template.content.cloneNode(true);

            // Sélection des éléments du template
            const imgElement = clone.querySelector(".product-image");
            const nomElement = clone.querySelector(".product-name");
            const marqueElement = clone.querySelector(".product-brand");
            const quantiteElement = clone.querySelector(".product-quantity");
            const nutriElement = clone.querySelector(".nutri-score");
            const novaElement = clone.querySelector(".nova-score");
            const ecoElement = clone.querySelector(".eco-score");

            // Remplissage des données
            imgElement.src = produit.image_small_url || "images/placeholder.jpg";
            imgElement.alt = produit.product_name || "Image non disponible";
            nomElement.textContent = produit.product_name || "Nom inconnu";
            marqueElement.textContent = "Marque : " + (produit.brands || "Non spécifié");
            quantiteElement.textContent = "Quantité : " + (produit.quantity || "Non spécifiée");

            // Gestion des images des scores
            nutriElement.src = `images/nutriscore-${produit.nutriscore_grade || "unknown"}.svg`;
            novaElement.src = `images/nova-group-${produit.nova_group || "unknown"}.svg`;
            ecoElement.src = `images/ecoscore-${produit.ecoscore_grade || "unknown"}.svg`;

            // Ajout de la carte au conteneur
            container.appendChild(clone);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
    }
}
