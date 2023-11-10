/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../api/local-storage";
import PokeApi from "../../api/poke-api";
import { Context } from "../../context-api/context";

import Search from "../search";
import Loader from "../loader";
import PokemonsTable from "../pokemons-table";
import { Outlet, useSearchParams } from "react-router-dom";
import Pagination from "../pagination";

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setPokemons, searchValue, setSearchValue } = useContext(Context);
  const [inputValue, setInputValue] = useState(getLocalStorageItem("search"));
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, [page, searchValue]);

  const handlePage = (page: number) => {
    setPage(page);
    setSearchParams({ page: String(page) });
  };

  const submitSearch = () => {
    setLocalStorageItem("search", inputValue);
    setSearchValue(inputValue);
    handlePage(1);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const fetchPokemons = async () => {
    setIsLoading(true);
    const pokemonsApi = new PokeApi();
    const { total, pokemons } = await pokemonsApi.getPokemons({
      page: +page,
      searchValue,
    });

    setTotal(total);
    setPokemons(pokemons);
    setIsLoading(false);
  };

  if (hasError) {
    throw new Error("Generated error");
  }

  return (
    <div className="container">
      <div className="right">
        <button className="error-button" onClick={() => setHasError(true)}>
          Error
        </button>
        <Search
          inputValue={inputValue}
          onInputChange={onInputChange}
          submitSearch={submitSearch}
        />
        {isLoading ? <Loader /> : <PokemonsTable />}
        <Pagination
          currentPage={+page}
          totalCount={total}
          pageLimit={20}
          setPage={handlePage}
        />
      </div>
      <div className="left">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
