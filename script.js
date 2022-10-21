const poke_container = document.querySelector('#poke-container');
const pokemonCount = document.querySelector('#pokemonCount');
const searchByName = document.querySelector('#searchByName');

console.log(searchByName.value);

let searchName = [];

let pokeData = [];

let generationsTab = document.querySelectorAll('#tabs li'),
    tab = [], index;

// add values to the array
for (let i = 0; i < generationsTab.length; i++) {
    tab.push(generationsTab[i].innerHTML);
}

for (let i = 0; i < generationsTab.length; i++) {
    generationsTab[i].onclick = function () {

        index = tab.indexOf(this.innerHTML);

        let generation = `limit=0&offset=0`;

        if (index == 0) {
            clearCards();
            generation = `limit=151&offset=0`;
            pokemonCount.innerHTML = `There are ${151} Pokemons in generation ${index + 1}`;
        } else if (index == 1) {
            clearCards();
            generation = `limit=100&offset=151`;
            pokemonCount.innerHTML = `There are ${100} Pokemons in generation ${index + 1}`;
        } else if (index == 2) {
            clearCards();
            generation = `limit=135&offset=251`;
            pokemonCount.innerHTML = `There are ${135} Pokemons in generation ${index + 1}`;
        } else if (index == 3) {
            clearCards();
            generation = `limit=107&offset=387`;
            pokemonCount.innerHTML = `There are ${107} Pokemons in generation ${index + 1}`;
        } else if (index == 4) {
            clearCards();
            generation = `limit=156&offset=493`;
            pokemonCount.innerHTML = `There are ${156} Pokemons in generation ${index + 1}`;
        } else if (index == 5) {
            clearCards();
            generation = `limit=72&offset=649`;
            pokemonCount.innerHTML = `There are ${72} Pokemons in generation ${index + 1}`;
        } else if (index == 6) {
            clearCards();
            generation = `limit=88&offset=721`;
            pokemonCount.innerHTML = `There are ${88} Pokemons in generation ${index + 1}`;
        } else if (index == 7) {
            clearCards();
            generation = `limit=96&offset=809`;
            pokemonCount.innerHTML = `There are ${96} Pokemons in generation ${index + 1}`;
        }

        getPokemon(generation);

    };
}

const getPokemon = async (gene) => {

    fetch(`https://pokeapi.co/api/v2/pokemon?${gene}`)
        .then(response => response.json())
        .then(data => {
            const fetches = data.results.map((item) => {
                return fetch(item.url).then(res => res.json());
            });
            Promise.all(fetches).then((res) => {
                pokeData = res;
                console.log(pokeData);
                res.forEach((item) => {
                    searchName.push(item.name);
                    createPokemonCard(item);
                });
            });
        });

    searchByName.style.visibility = 'visible';

};

const findPokemon = () => {

    let searched = searchByName.value.toLowerCase();
    let results = pokeData.filter(items => (items.name.includes(searched)));
    clearCards();
    results.forEach(result => {
        createPokemonCard(result);
    });
};


const createPokemonCard = (pokemon) => {
    const pokemonElements = document.createElement('div');
    pokemonElements.classList.add('pokemon');

    const name = pokemon.name.toUpperCase();

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src=${pokemon.sprites.other["official-artwork"].front_default} alt="${pokemon.name}"/>
        </div>
        <div class="info">
            <span class="number">${pokemon.id}</span>
            <h3 class="name">${name}</h3>
            <div>${pokemon.types
            .map(
                (type) =>
                    `<img id="poke-symbol" src="assets/icons/${type.type.name}.png"
                        alt="${type.type.name} image"
                    />`
            ).join("")} 
            </div>
        
        </div>
    `;

    pokemonElements.innerHTML = pokemonInnerHTML;

    poke_container.appendChild(pokemonElements);
};

function clearCards() {
    document.querySelector('#poke-container').innerHTML = "";
    document.querySelector('#pokemonCount').innerHTML = "";
}