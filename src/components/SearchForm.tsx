import React, { ChangeEvent, useState } from 'react';
import { SearchFormProps } from '../types/interface';

export const SearchForm = (props: SearchFormProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState(props.searchTerm || '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    props.onSearch(searchTerm);
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
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
