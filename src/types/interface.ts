export interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}
export interface SearchFormState {
  searchTerm: string;
}

export interface Results {
  url: string;
  image: string;
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
  };
}

export interface ResultsAPIProps {
  results: Results[];
  error: Error | null;
  selectedPageSize: number;
}

export interface AppState {
  userInput: string;
  results: Results[];
  error: Error | null;
  loading: boolean;
}
