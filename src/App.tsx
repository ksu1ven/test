import { useEffect, useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultsAPI } from './components/Results';
import './App.css';
import { fetchCharacter } from './rest api/character';

export const App = () => {
  const storedUserInput = localStorage.getItem('userInput');
  const [userInput, setUserInput] = useState(storedUserInput || '');

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    handleSearch(userInput);
  }, [userInput]);

  const handleSearch = (userInput: string) => {
    localStorage.setItem('userInput', userInput);
    setUserInput(userInput);
    setResults([]);
    setError(null);
    setLoading(true);

    fetchCharacter(userInput)
      .then((data) => setResults(data.results))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <SearchForm onSearch={handleSearch} searchTerm={userInput} />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <ResultsAPI results={results} error={error} />
      )}
    </div>
  );
};
