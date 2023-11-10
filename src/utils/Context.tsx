import { createContext } from 'react';
import { Results } from '../types/interface';
/* eslint-disable @typescript-eslint/no-unused-vars */
export const ResultContext = createContext({
  results: [],
  error: null,
  selectedPageSize: 10,
  onItemClick: (result: Results) => {},
});
export const SearchContext = createContext({
  onSearch: (userInput: string) => {},
  searchTerm: '',
});
/* eslint-enable @typescript-eslint/no-unused-vars */
