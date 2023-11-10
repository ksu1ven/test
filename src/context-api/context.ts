import React, { createContext } from "react";
import PokemonResponse from "../types/pokemon-response";
import { getLocalStorageItem } from "../api/local-storage";

interface ContextInterface {
  pokemons: PokemonResponse[];
  setPokemons: React.Dispatch<React.SetStateAction<PokemonResponse[]>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<ContextInterface>({
  pokemons: [],
  setPokemons: () => {},
  searchValue: getLocalStorageItem("search"),
  setSearchValue: () => {},
});
