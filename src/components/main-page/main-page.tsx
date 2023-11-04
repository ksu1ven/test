import React, { ChangeEvent, useEffect, useState } from "react";
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

const MainPage = () => {
  const [pokemons, setPokemons] = useState<PokemonResponse[]>([]);
  const [search, setSearch] = useState(getLocalStorageItem("search"));
  const [inputValue, setInputValue] = useState(getLocalStorageItem("search"));
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitSearch = () => {
    setSearch(inputValue);
    setLocalStorageItem("search", inputValue);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
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
      setPokemons(pokemons);
      setIsLoading(false);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(
    (pokemon) => pokemon.name.indexOf(search) !== -1,
  );

  if (hasError) {
    throw new Error("Generated error");
  }

  return (
    <>
      <button className="error-button" onClick={() => setHasError(true)}>
        Error
      </button>
      <Search
        inputValue={inputValue}
        onInputChange={onInputChange}
        submitSearch={submitSearch}
      />
      {isLoading ? <Loader /> : <PokemonsTable pokemons={filteredPokemons} />}
    </>
  );
};

export default MainPage;
