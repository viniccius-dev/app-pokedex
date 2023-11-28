var amount = document.getElementById('amount');

amount.addEventListener('keyup',()=>{
    catchPokemons(amount.value);
})

catchPokemons(9);

function catchPokemons(amount){
    
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+amount)
        .then(response => response.json())
        .then(allpokemon => {

            var pokemons = [];
            
            allpokemon.results.map((val)=>{

                fetch(val.url)
                .then(response => response.json())
                .then(pokemonSingle => {
                    pokemons.push({
                        name:val.name,
                        image: pokemonSingle.sprites.front_default
                    });

                    if(pokemons.length == amount){
                        //Finalizamos nossas requisiões

                        var pokemonBoxes = document.querySelector('.pokemon-boxes');

                        pokemonBoxes.innerHTML = "";
                        
                        pokemons.map((val)=>{

                            pokemonBoxes.innerHTML += `
                            
                                <div class="pokemon-box">
                                    <img src="`+val.image+`">
                                    <p>`+val.name+`</p>
                                </div>

                            `;
                        })

                    }
                })

            });

        });

}