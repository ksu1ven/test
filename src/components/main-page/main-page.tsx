import React from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../api/local-storage";
import PokeApi from "../../api/poke-api";
import PokemonResponse from "../../types/pokemon-response";
import PokemonsProps from "../../types/pokemons-props";
import Search from "../search";
import Loader from "../loader";
import PokemonsTable from "../pokemons-table";

interface StateProps {
  pokemons: PokemonResponse[];
  search: string;
  inputValue: string;
  isLoading: boolean;
  hasError: boolean;
}

export class MainPage extends React.Component {
  state: StateProps = {
    pokemons: [],
    search: getLocalStorageItem("search"),
    inputValue: getLocalStorageItem("search"),
    isLoading: false,
    hasError: false,
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  submitSearch = () => {
    this.setState({ search: this.state.inputValue });
    setLocalStorageItem("search", this.state.inputValue);
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const pokemonsApi = new PokeApi();
    const pokemonsArray = await pokemonsApi.getPokemons();
    const pokemons = await Promise.all(
      pokemonsArray.map(async (pokemon: PokemonsProps) => {
        const { name, weight, height, abilities, image } =
          await pokemonsApi.getPokemon(pokemon.name);

        return {
          name,
          weight,
          height,
          abilities,
          image,
        };
      }),
    );
    this.setState({ pokemons });
    this.setState({ isLoading: false });
  }
  render() {
    const pokemons = this.state.pokemons.filter(
      (pokemon) => pokemon.name.indexOf(this.state.search) !== -1,
    );

    if (this.state.hasError) {
      throw new Error("Generated error");
    }

    return (
      <>
        <button
          className="error-button"
          onClick={() => this.setState({ hasError: true })}
        >
          Error
        </button>
        <Search
          inputValue={this.state.inputValue}
          onInputChange={this.onInputChange}
          submitSearch={this.submitSearch}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <PokemonsTable pokemons={pokemons} />
        )}
      </>
    );
  }
}
