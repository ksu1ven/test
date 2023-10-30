export interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}
export interface SearchFormState {
  searchTerm: string;
}

export interface Results {
  url: string;
  mass: string;
  name: string;
  skin_color: string;
  gender: string;
  eye_color: string;
}

export interface AppState {
  userInput: string;
  results: Results[];
  error: Error | null;
  loading: boolean;
}
