
async function afficher(){
    var button = document.getElementsByTagName('button')[0];
    button.style.visibility = 'hidden';
    let template = document.getElementById("card-template");
    let nombre = [];
    nouveau = [];
    nouveaubis =[];
    for(var j = 1; j < 101; j++){
        nombre.push(j);
    }
    await Promise.all(nombre.map(async item => {
            await get(item);}))


    for (var i = 0; i < 100; i++) {
        for(var j = 0; j<100; j++){
            if(nouveaubis[j]._numero == i + 1){
                img = nouveaubis[j];
            }
        }

        let clone = document.importNode(template.content, true);
        nomfrancais = nouveau[i];
        image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${nombre[i]}.svg`;
        let imagetype = new Image();
        imagetype = `../images/type_${img._type1.name}.png`;
        let imagetype2 = new Image();
        imagetype2 = `../images/type_${img._type2.name}.png`;
    

        
        newContent = clone.firstElementChild.innerHTML
            .replace(/{{nom}}/g, nomfrancais)
            .replace(/{{image}}/g,image)
            .replace(/{{numero}}/g,nombre[i])
            .replace(/{{slot1}}/g,imagetype)
            .replace(/{{slot2}}/g,imagetype2)
            clone.firstElementChild.innerHTML = newContent;
            placer = document.getElementById("card-template")
            placer.appendChild(clone);
    } 
}


async function get(item){
    const url = `https://pokeapi.co/api/v2/pokemon-species/${item}/`;
    const urlbis = `https://pokeapi.co/api/v2/pokemon/${item}/`;

    let fetchOptions = { method: 'GET' };

    try {
        const response = await fetch(url, fetchOptions);
        const datajson = await response.json();
        await nouveau.push(JSON.stringify(datajson.names[4].name));

        const responsebis = await fetch(urlbis, fetchOptions);
        const datajsonbis = await responsebis.json();
        if(JSON.stringify(datajsonbis.types[1]) !== undefined){
            await nouveaubis.push(
                new TypeCreator(
                    item,datajsonbis.types[0].type,datajsonbis.types[1].type
                )
            )
        }
        else{
            await nouveaubis.push(
                new TypeCreator(
                    item,datajsonbis.types[0].type,0
                )
            )
        }
    } catch (error) {
        console.error('Erreur lors de la requête API:', error);
    }
}

class TypeCreator{
    constructor(numero,type1,type2){
        this._numero = numero;
        this._type1 = type1;
        this._type2 = type2;
    }
}


