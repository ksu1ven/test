/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPage from "./components/main-page";
import ErrorBoundary from "./components/error-boundary";
import PokemonResponse from "./types/pokemon-response";
import { Context } from "./context-api/context";

function App() {
  const [pokemons, setPokemons] = useState<PokemonResponse[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.search.includes("page")) {
      const path = !window.location.search
        ? "?page=1"
        : `${window.location.search}&page=1`;
      navigate(path, { replace: true });
    }
  }, []);

  return (
    <Context.Provider
      value={{ pokemons, setPokemons, searchValue, setSearchValue }}
    >
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </Context.Provider>
  );
}

export default App;
