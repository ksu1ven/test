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
  const [pages, setPages] = useState([]);

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
  let page: number = 1;
  async function fetchRickAndMortyCharactersNext() {
    page = page + 1;
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
    setPages([]);
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log('Результаты поиска персонажей:');
        console.log(data.info);

        setPages(data.results);
        return data.results;
      } else {
        console.log('Ошибка при запросе данных:', response.status);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  async function fetchRickAndMortyCharactersPrev() {
    page = page - 1;
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
    setPages([]);
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log('Результаты поиска персонажей:');
        console.log(data.info);
        setPages(data.results);
        return data.results;
      } else {
        console.log('Ошибка при запросе данных:', response.status);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  return (
    <div>
      <button onClick={fetchRickAndMortyCharactersPrev}>Prev</button>
      <div>${page}</div>
      <button onClick={fetchRickAndMortyCharactersNext}>Next</button>
      {/* <button onClick={ResultsAPI}>Next</button> */}

      <SearchForm onSearch={handleSearch} searchTerm={userInput} />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <ResultsAPI results={results} resultsByPage={pages} error={error} />
      )}
    </div>
  );
};
