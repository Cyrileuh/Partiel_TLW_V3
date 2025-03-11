function chargerListePokemon() {
    for (let i = 1; i<=100; i++){
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + i)
        .then (response => response.json())
        .then (function(response_json) {
            for (langue of response_json.names) {
                if (langue.language.name == "fr") {
                    document.getElementById("tableau_body").innerHTML +=
                    "<tr>" +
                    "   <td>" + i + "</td>" +
                    "<td>" + langue.name + "</td>" +
                    "</tr>"
                }
            }
        })
    }
}

async function chargerListePokemonV2() {
    for (i=1; i<=100; i++) {
        let response = await fetch ("https://pokeapi.co/api/v2/pokemon-species/" + i )
        let response_json = await response.json()
        
        document.getElementById("tableau_body").innerHTML +=
        "<tr>" +
        "   <td>" + i + "</td>" +
        "<td>" + response_json.names[4].name + "</td>" +
        "</tr>"
    }
}