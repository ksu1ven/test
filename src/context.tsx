import { createContext } from 'react';
import { Data } from './types/types';
const searchText = localStorage.getItem('name') || '';

type CustomContext = {
  searchText: string;
  setSearchText: (text: string) => void;
  data: Data | null;
  page: string;
  setPage: (page: string) => void;
};

export const CustomContext = createContext<CustomContext>({
  searchText,
  setSearchText: () => {},
  data: null,
  page: '1',
  setPage: () => {},
});
