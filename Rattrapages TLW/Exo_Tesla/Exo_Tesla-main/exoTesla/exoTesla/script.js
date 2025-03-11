async function remplir_accessoires() {
    let reponse = await fetch ('accessoires.json');
    let json = await reponse.json();

    var template = document.querySelector("#template_accessoires");

    for (const e of json.tableau_accessoires) {
        let clone = document.importNode(template.content, true );
        newContent = clone.firstElementChild.innerHTML  
            .replace(/{{accessoires-image}}/g, e.image)
            .replace(/{{accessoires-titre}}/g, e.titre)
            .replace(/{{accessoires-texte}}/g, e.texte);
        clone.firstElementChild.innerHTML = newContent;
        document.getElementById("grid-container").appendChild(clone);
    }
}
