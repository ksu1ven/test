export interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}
export interface SearchFormState {
  searchTerm: string;
}

export interface Results {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface AppState {
  userInput: string;
  results: Results[];
  error: Error | null;
}
