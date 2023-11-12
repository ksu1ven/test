import React, { ChangeEvent, useContext, useState } from 'react';
import { SearchContext } from '../utils/Context';

export const SearchForm = (): JSX.Element => {
  const context = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState(context.searchTerm || '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    context.onSearch(searchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="SearchFormContainer">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
