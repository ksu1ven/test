import PokemonData from "../types/pokemon-data";
import PokemonsProps from "../types/pokemons-props";

export default class PokeApi {
  apiUrl: string;
  limit: number;
  constructor() {
    this.apiUrl = "https://pokeapi.co/api/v2";
    this.limit = 20;
  }

  async getAllPokemons(searchValue: string) {
    return await fetch(`${this.apiUrl}/pokemon?limit=1500`)
      .then((response) => response.json())
      .then((data) => {
        const result = data.results.filter(
          (pokemon: PokemonsProps) => pokemon.name.indexOf(searchValue) !== -1,
        );

        return {
          total: result.length,
          pokemons: result,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async getPokemons({
    page,
    searchValue = "",
    limit = this.limit,
  }: {
    page: number;
    searchValue: string;
    limit?: number;
  }) {
    const from = limit * (page - 1);
    const to = limit * page;
    const { total, pokemons } = await this.getAllPokemons(searchValue);

    return {
      total,
      pokemons: await this.getConvertPokemonsArray({ pokemons, from, to }),
    };
  }

  async getConvertPokemonsArray({
    pokemons,
    from,
    to,
  }: {
    pokemons: PokemonsProps[];
    from: number;
    to: number;
  }) {
    return await Promise.all(
      pokemons.slice(from, to).map(async (pokemon) => {
        const convertPokemon = await this.getPokemon(pokemon.name);

        return {
          name: convertPokemon.name,
          weight: convertPokemon.weight,
          height: convertPokemon.height,
          abilities: convertPokemon.abilities,
          image: convertPokemon.image,
        };
      }),
    );
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
