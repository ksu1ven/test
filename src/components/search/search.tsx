import React from "react";

type Props = {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitSearch: () => void;
};

const Search = ({ inputValue, onInputChange, submitSearch }: Props) => {
  return (
    <div className="search__wrapper">
      <span className="search__text">Search by name:</span>
      <input
        className="search__input"
        type="text"
        value={inputValue}
        onChange={onInputChange}
      />
      <button className="search__button" onClick={submitSearch}>
        Submit
      </button>
    </div>
  );
};

export default Search;
