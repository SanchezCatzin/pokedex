//Se toman todos los pokemons desde la api
let listaPokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

// Buscar la lista de pokemons
let mostrarPokemon = fetch(listaPokemonUrl).then(
    respuesta => respuesta.json()).then(
        data => {return data.results});

// Buscar el pokemon en la lista anterior
async function buscarEnListaDePokemons(){
    let  pokemonBuscado = inputBox.value.toLocaleLowerCase();
    let array = await mostrarPokemon;
    for (let i = 0; i < array.length; i++ ){
        if(pokemonBuscado == array[i].name){
            let pokemonUrl = array[i].url;
            console.log(pokemonUrl);
            //Una vez encontrados el pokemon se buscan los campos
            buscarCamposDepokemon(pokemonUrl) 
            return 
        }
    } 
    alert("Ingrese un nombre correcto");
}

//Funcion para buscar los campos (esta tiene muchas funciones para cada campo en particular
function buscarCamposDepokemon(direccionUrl){
    fetch(direccionUrl)
        .then(respuesta => respuesta.json())
        .then(data => {
            let name = data.name;
            let numero = data.id;
            let types = data.types;
            let tiposAMostrar = buscarTypes(types);
            let imgPokemon = data.sprites.front_default;
            let peso = (data.weight)/10;
            let altura = (data.height)/10;
            
            imgPokedex.setAttribute('src', imgPokemon);
            imgPokedex.setAttribute('alt', "img-Pokemon");
            numPokedex.innerHTML = `No.${numero}`;
            namePokedex.innerHTML = name;
            typosPokedex.innerHTML = tiposAMostrar;
            alturaPokedex.innerHTML = `${altura} m`;
            pesoPokedex.innerHTML = `${peso} kg`;
            
            //Buscar el habitad por la especie
            fetch(data.species.url).then(respuesta => respuesta.json()).then(data => {
            data.habitat != null  ? habitadPokedex.innerHTML = data.habitat.name : habitadPokedex.innerHTML = "Indeterminado"

            });

        })
}
//Funciones PARTICULARES

//Funcion para obtener los types
function buscarTypes(tipos){
    let arregloDeTipos = []
    for(let i = 0; i < tipos.length; i++){
        arregloDeTipos.push(tipos[i].type.name) 
    }
    return arregloDeTipos
}
//Funcion para crear la imagen
function imagenPokemon(){

}

//Tomando los elementos de la barra para buscar
let wraperinos = document.querySelector(".wrapper");
let searchWrapper = document.querySelector(".search-input");
let inputBox = searchWrapper.querySelector("input");
let suggBox = searchWrapper.querySelector('.autocom-box');
let buscarBtn = searchWrapper.querySelector('.icon')

//Tomando elementos para cambiar por stats de pokedex
let envoltorioImgPokedex = document.querySelector('.wraper-img');
let imgPokedex = envoltorioImgPokedex.querySelector("img");
let envoltorioPokedex = document.querySelector('.wraper-pokedex');
let numPokedex = envoltorioPokedex.querySelector(".numero");
let namePokedex = envoltorioPokedex.querySelector(".nombre");
let typosPokedex = envoltorioPokedex.querySelector(".tipo");
let alturaPokedex = envoltorioPokedex.querySelector(".altura");
let pesoPokedex = envoltorioPokedex.querySelector(".peso");
let habitadPokedex = envoltorioPokedex.querySelector(".habitad");

inputBox.addEventListener('input', cambio);

inputBox.addEventListener('keydown', function (e) {
    
    /* if(){}; */

    if (e.key === 'Enter') {
        buscarEnListaDePokemons()
        suggBox.innerHTML = "";
        inputBox.classList.remove("active");
    };

    if(e.key === 'ArrowDown'){
        console.log("arrowdown");
    };

    if(e.key == 'ArrowUp'){
        console.log("arrowup");
    };
});

/* inputBox.addEventListener('change', cambio) */


buscarBtn.addEventListener('click', () => {
    buscarEnListaDePokemons();
    inputBox.classList.remove("active");
    suggBox.innerHTML = "";
});


async function cambio(){
    let valor = inputBox.value.toLocaleLowerCase();
    inputBox.classList.remove("active")
    let arreglo = []
    if(valor == ""){
        suggBox.innerHTML = "";
        return
    }
    let arrayVacio = await mostrarPokemon;
    
    let arreglo1 = hacerListaSugerencia(arrayVacio,arreglo,valor);
    
    inputBox.classList.add("active");
    listaSugerida = arreglo1.join('');
    suggBox.innerHTML = listaSugerida;    
    
    agregarListenerParaClick()

};

function agregarListenerParaClick() {
    let busquedaPokemon = suggBox.getElementsByTagName("li");
        for(let i= 0; i < busquedaPokemon.length; i ++ ){
            busquedaPokemon[i].addEventListener('click', e => {
            inputBox.value = e.target.innerHTML;
            suggBox.innerHTML = "";
            inputBox.classList.remove("active");
            buscarEnListaDePokemons();
        })    
    }
}


function hacerListaSugerencia(array, array1, valor){
    for(let i = 0; i < 1010; i++){
        
        if(array[i].name.includes(valor)){
            array1.push(`<li>${array[i].name}</li>`);
        }
    };
    return array1
}