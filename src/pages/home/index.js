import './index.scss';
import logo from '../../assets/images/logo.png';
import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState('');

  async function buscar(url) {
    let response = await axios.get(url);
    let listaPokemons = [];

    for (let item of response.data.results) {
      let pokemonResp = await axios.get(item.url);

      let imagem = pokemonResp.data.sprites.other['official-artwork'].front_default;

      let tipos = '';
      for (let t of pokemonResp.data.types) {
        tipos = tipos + t.type.name + ' ';
      }

      listaPokemons.push({
        nome: item.name,
        imagem: imagem,
        tipos: tipos
      });
    }

    setPokemons(listaPokemons);
    setNextUrl(response.data.next);
  }

  async function buscarMais() {
    if (nextUrl) {
      await buscar(nextUrl);
    }
  }

  return (
    <main className='pagina-app'>
      <div className='container'>
        <div className='container-01'>
          <img src={logo} alt='logo' />
          <button onClick={() => buscar('https://pokeapi.co/api/v2/pokemon')}>Encontrar Pokemóns</button>
        </div>

        <div className='container-02'>
          {pokemons.map(item =>
            <div key={item.nome}>
              <img src={item.imagem} alt='img' />
              <h6>{item.nome}</h6>
              <p>{item.tipos}</p>
            </div>
          )}
        </div>

        <div className='container-03'>
          <button onClick={buscarMais}>Buscar mais</button>
        </div>
      </div>
    </main>
  );
}
