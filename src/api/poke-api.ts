import PokemonData from "../types/pokemon-data";
import PokemonResponse from "../types/pokemon-response";
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
          isDefault: convertPokemon.isDefault,
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

  convertPokemon({
    name,
    abilities,
    sprites,
    weight,
    height,
    is_default,
  }: PokemonData): PokemonResponse {
    return {
      name: this.capitalizeFirstLetter(name),
      weight,
      height,
      abilities: abilities.map((ability) => ability.ability.name),
      image: [
        {
          type: "front",
          url: sprites.front_default ?? sprites.front_shiny ?? null,
        },
        {
          type: "back",
          url: sprites.back_default ?? sprites.back_shiny ?? null,
        },
      ],
      isDefault: is_default,
    };
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
