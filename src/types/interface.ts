export interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}
export interface SearchFormState {
  searchTerm: string;
}

export interface Results {
  url: string;
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  type: string;
  episode: [];
  location: {
    name: string;
  };
}

export interface EpisodeDetails {
  id: number;
  name: string;
  episode: string;
}
export interface ResultsAPIProps {
  results: Results[];
  error: Error | null;
  selectedPageSize: number;
  onItemClick: (result: Results) => void;
}

export interface AppState {
  userInput: string;
  results: Results[];
  error: Error | null;
  loading: boolean;
}

export interface DetailsProps {
  characterDetails: Results;
  onClose: () => void;
}
