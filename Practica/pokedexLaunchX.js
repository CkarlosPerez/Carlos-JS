const fetchPokemon = (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetch(url).then((res) => {
        if(res.status != 200){
            console.log(res);
            pokeImage("./assets/img/pikachu-triste.gif");
        }
        else{
            return res.json();
        }
    }).then((data)=>{
        console.log(data);
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);

        let nombrePokemon = data.name;
        console.log(nombrePokemon);
        let idPokemon = data.id;
        console.log(idPokemon);

        sendName(idPokemon, nombrePokemon);

        

        /*let movimientos = data.moves.map(mov => mov.move.name); 
        console.log(movimientos);*/
        for(let i=0; i<6; i++){
            for(let j=1; j<=10; j++){
                console.log('divs'+(i+1)+'-'+j);
                cambiar_fondo2('divs'+(i+1)+'-'+j);
            }
        }

        let attackPokemon = data.stats.map(sts => sts.base_stat);

        for(let i=0; i<7; i++){
            let size = Math.round(attackPokemon[i]/10);
            if(size>10){
                size=10;
            }
            console.log(size);
            for(let j=1; j<=size; j++){
                cambiar_fondo('divs'+(i+1)+'-'+j);
            }
        }
        
        
        let tipoPokemon = data.types.map(type => type.type.name);
        let alturaPokemon = data.height;
        let pesoPokemon = data.weight;

        sendGral(tipoPokemon, alturaPokemon, pesoPokemon);
    })
}

//fetchPokemon();

const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

//pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");

const imprimir = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    fetchPokemon(pokeInput);
    console.log("Hola " + pokeInput);
}

const sendName = (id, name) =>{
    const idName = document.getElementById("idName");
    idName.innerHTML = "#"+id +" "+ name;
}

const sendGral = (tipoPokemon, alturaPokemon, pesoPokemon) => {
    const tipo = document.getElementById("tipo");
    tipo.innerHTML = tipoPokemon;

    let altura2 = (alturaPokemon/10); 

    const altura = document.getElementById("altura");
    altura.innerHTML = ' '+altura2+' m';

    let peso2 = (pesoPokemon/10);

    const peso = document.getElementById("peso");
    peso.innerHTML = ' '+peso2+' kg';
}

function cambiar_fondo(div) {
    obj = document.getElementById(div);
    obj.style.backgroundColor =  'blue';
}

function cambiar_fondo2(div) {
    obj = document.getElementById(div);
    obj.style.backgroundColor =  'white';
}
