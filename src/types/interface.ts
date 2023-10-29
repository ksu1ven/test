export interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}
export interface SearchFormState {
  searchTerm: string;
}
