import React, { useState, useEffect } from 'react';
import './styles.css'
import Axios from 'axios';

export default function Index() {
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);

    function fetchPokemonData(pokemon) {
        let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
        Axios.get(url)
            .then(function (response) {
                setPokemons(pokemons => [...pokemons, response.data]);
                setLoading(false);

            })
    }

    useEffect(() => {
        Axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(function (response) {
                response.data.results.forEach(function (pokemon) {
                    fetchPokemonData(pokemon);
                })
            })
    }, []);

    return (
        <div className="pokedex-container">
            <h1>Pokedex</h1>
            <ul>
                {loading ? <div>loading...</div> : pokemons.map(pokemons => (
                    <li key={pokemons.id}>
                        <img src={pokemons.sprites.front_default} alt="sprite" />
                        <strong>{pokemons.name}</strong>
                        <p>{pokemons.height} m {pokemons.weight} kg</p>

                        <div className="types">
                            {pokemons.types.map(pokemons =>
                                (pokemons.type.name)
                            ).join(' | ')}
                        </div>
                    </li>


                ))}
            </ul>
        </div>
    );
}