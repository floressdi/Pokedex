
const pokeNameInput= document.getElementById('pokeNameInput');
const url ='https://pokeapi.co/api/v2/pokemon/';
const ShowPokeStats = document.getElementById('ShowPokeStats');
const btnBack = document.getElementById('btn-back');
const showErrorText = document.getElementById('show-error-text');
const showErrorContainer = document.getElementById('ShowError');
const pokeInfo = document.getElementById('pokeInfo');


btnBack.addEventListener('click', ()=>{
    pokeInfo.classList.toggle('showPokeinfo')
    pokeNameInput.value="";
})

const typeColors = {
    electric: '#FFE45C',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

function insertPokemon(){
    window.fetch(`${url}${pokeNameInput.value.toLowerCase()}`)
    .then(res =>{
        if(res.status === 404 || pokeNameInput.value== 0){
            showErrorContainer.classList.add('show-error-container');
            showErrorText.innerText = 'There are no pokemon that match your search';
        }else{
             showErrorContainer.classList.remove('show-error-container');
             showErrorText.innerText=''; 
            return res.json()
        }
    })
    .then(resJSON =>{
        const result = []
    
        for(let pokemonInfo in resJSON){
            result.push([pokemonInfo, resJSON[pokemonInfo]])
        }

        const pokePhoto = document.getElementById("pokeImg")
        pokePhoto.src = result[14][1].front_default

        const pokemonName = document.getElementById("namePokemon");
        pokemonName.innerText = result[10][1]

        const pokemonType = document.getElementById("typePokemon")
        pokemonType.innerText = result[16][1][0].type.name
        pokemonType.style.color = typeColors[result[16][1][0].type.name];

        const pokeInfo = document.querySelector(".pokeinfo");
        pokeInfo.style.backgroundColor = typeColors[result[16][1][0].type.name];
        
        const pokeHeight = document.getElementById("pokeHeight")
        pokeHeight.innerText = ((result[4][1] / 10000)*1000)+ " M";
        
        const pokeWeight = document.getElementById("pokeWeight")
        pokeWeight.innerText = ((result[17][1] / 10000)*1000 )+ " Kg";

        const pokeId = document.getElementById("pokeId")
        pokeId.innerText = result[6][1];

        pokeStats = result[15][1];         
        
        const statistics = pokeStats.map(element =>{
            return{
                stat_name: element.stat.name,
                base_stat: element.base_stat
            }
        })

        showDOM("Estadisticas", statistics);

        ShowPokeStats.classList.add('statElement');

        function showDOM(element, arr){
            ShowPokeStats.innerHTML = "";
            for (let e of arr){
                ShowPokeStats.innerHTML += `<div> <p>${e.stat_name}</p> <p>${e.base_stat}</p>  </div>`
            }
        }
        pokeInfo.classList.toggle('showPokeinfo');
    });
}