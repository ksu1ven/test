import PokemonData from "../types/pokemon-data";

export default class PokeApi {
  apiUrl: string;
  constructor() {
    this.apiUrl = "https://pokeapi.co/api/v2";
  }

  async getPokemons() {
    return await fetch(`${this.apiUrl}/pokemon?limit=100&offset=0`)
      .then((response) => response.json())
      .then((data) => data.results)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async getPokemon(name: string) {
    return await fetch(`${this.apiUrl}/pokemon/${name}`)
      .then((respose) => respose.json())
      .then((data) => this.convertPokemon(data))
      .catch((error) => {
        throw new Error(error);
      });
  }

  convertPokemon({ name, abilities, sprites, weight, height }: PokemonData) {
    return {
      name,
      weight,
      height,
      abilities: abilities.map((ability) => ability.ability.name),
      image: sprites.front_default ?? sprites.front_shiny ?? null,
    };
  }
}
