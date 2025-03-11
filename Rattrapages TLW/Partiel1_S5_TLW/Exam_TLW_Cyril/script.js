function parseMana(str) {
    return str.split(/\s*({\w*})\s*/g).filter(Boolean);
}


async function afficherCartes() {
    let reponse = await fetch("https://api.scryfall.com/cards/search?q=e:ltr&format=json&order=set&unique=prints");
    let donnees = await reponse.text();
    console.log(donnees.length); 
    

    for (const name of donnees.data) {
        document.getElementById('nom_carte').appendChild(donnees.data.name)
    }

    /* Manque de temps pour gérer l'api */
}