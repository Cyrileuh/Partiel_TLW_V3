function parseMana(str) {
    return str.split(/\s*({\w*})\s*/g).filter(Boolean);
}

async function afficherCartes() {
    var response = await fetch("https://api.scryfall.com/cards/search?q=e:ltr lang:fr&format=json&order=set&unique=prints");
    var tab_json = await response.json();
    var tab_data = tab_json.data;
    getSymbols();

    while (tab_json.has_more    ) {
        response = await fetch(tab_json.next_page);
        tab_json = await response.json();
        tab_data.push.apply(tab_data, tab_json.data);
    }
    
    var template = document.getElementById("card-template");
    for (var e of tab_data) {
        var mana = parseMana(e.mana_cost);
        let clone = document.importNode(template.content, true);
        new_content = clone.firstElementChild.innerHTML
            .replace(/{{image}}/g, e.image_uris.normal)
            .replace(/{{texte}}/g, e.printed_name)
        clone.firstElementChild.innerHTML = new_content;
        document.getElementById("grid-container").appendChild(clone);
    }
}   

async function getSymbols () {
    var response = await fetch("https://api.scryfall.com/symbology");
    var tab_json = await response.json();
    dico_symbols = {};
    
    for (var e of tab_json.data) {
        dico_symbols[e.symbol] = e.svg_uri;
    }
}