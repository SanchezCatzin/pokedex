/* let pokemonimg = document.getElementsByClassName("img")[0];
var obj = {} */
/* let pokemonIngresado = prompt("Ingresa Pokemon");

let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIngresado}/`;

let pokemon = fetch(pokemonUrl).then(
    respuesta => respuesta.json()
).then(
    data => {console.log(data.sprites.front_default);
    let srcImagenPokemon = data.sprites.front_default
    pokemonimg.setAttribute('src', srcImagenPokemon)
}) */


let listaPokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

/* function mostrarPokemon(pokemonABuscar){
    fetch(listaPokemonUrl).then(
        respuesta => respuesta.json()).then(
            data => {
                let arrayPokemons = data.results;
                for (let i = 0; i < arrayPokemons.length; i++ ){
                    if(pokemonABuscar == arrayPokemons[i].name){
                        let pokemonUrl = arrayPokemons[i]
                        return pokemonUrl
                    }
                }
            })
} */

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
let searchWrapper = document.querySelector(".search-input");
let inputBox = searchWrapper.querySelector("input");
let suggBox = searchWrapper.querySelector('.autocom-box');
let buscarBtn = searchWrapper.querySelector('.icon')

//Tomando elementos para cambiar por stats de pokedex
let envoltorioPokedex = document.querySelector('.wraper-pokedex');
let imgPokedex = envoltorioPokedex.querySelector("img");
let numPokedex = envoltorioPokedex.querySelector(".numero");
let namePokedex = envoltorioPokedex.querySelector(".nombre");
let typosPokedex = envoltorioPokedex.querySelector(".tipo");
let alturaPokedex = envoltorioPokedex.querySelector(".altura");
let pesoPokedex = envoltorioPokedex.querySelector(".peso");
let habitadPokedex = envoltorioPokedex.querySelector(".habitad");

//Aqui se ponen los eventos necesarios para el funcionamiento
inputBox.addEventListener('input', cambio);
inputBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        buscarEnListaDePokemons()
    }
});

buscarBtn.addEventListener('click', buscarEnListaDePokemons);


function cambio(){
    console.log(inputBox.value);
}



