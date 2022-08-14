const nome_pokemon = document.querySelector('.nome_pokemon');
const numero_pokemon = document.querySelector('.numero_pokemon');
const img_pokemon = document.querySelector('.img_pokemon'); 
const formulario = document.querySelector('.formulario');
const procura = document.querySelector('.procura');
const botaoAnterior = document.querySelector('.botao-ant');
const botaoProximo = document.querySelector('.botao-prox');

let procuraPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResposta.status === 200){
        const dados = await APIResposta.json();
        return dados;
    }    

}

const renderPokemon = async (pokemon) => { 
    nome_pokemon.innerHTML = 'Carregando...';
    numero_pokemon.innerHTML = '';

    const dados= await  fetchPokemon(pokemon); 

    if (dados){
        nome_pokemon.innerHTML = dados.name;
        numero_pokemon.innerHTML = dados.id;
        img_pokemon.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        procura.value = '';
        procuraPokemon = dados.id;
        img_pokemon.style.display = '';

    } else {
        nome_pokemon.innerHTML = 'Nome invalido';
        numero_pokemon.innerHTML = '';
        img_pokemon.style.display = 'none';
    }


}



formulario.addEventListener('submit', (event) =>  {
    event.preventDefault();
    renderPokemon(procura.value.toLowerCase());

});

botaoAnterior.addEventListener('click', () =>  {
    if (procuraPokemon > 1){
        procuraPokemon -= 1;
        renderPokemon(procuraPokemon);
    }

});

botaoProximo.addEventListener('click', () => {
    procuraPokemon += 1;
    renderPokemon(procuraPokemon);
  });
renderPokemon('1');