import { useEffect, useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultsAPI } from './components/Results';
import './App.css';
import {
  fetchCharacter,
  fetchCharacterByPage,
  fetchDetails,
} from './rest api/character';
import { Results } from './types/interface';
import { Details } from './components/Details';

export const App = () => {
  const storedUserInput = localStorage.getItem('userInput');
  const [userInput, setUserInput] = useState(storedUserInput || '');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCharacterId, setSelectedCharacterId] = useState<
    number | null
  >();
  const [characterDetails, setCharacterDetails] = useState<Results | null>(
    null
  );

  const handleSelectedCharacter = (characterId: number) => {
    setSelectedCharacterId(characterId);
    setLoading(true);
    fetchDetails(characterId)
      .then((details) => {
        setCharacterDetails(details);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching character details: ', error);
        setLoading(false);
      });
  };

  const handleSelectedCharacterFromResults = (result: Results) => {
    handleSelectedCharacter(result.id);
  };

  const handleClearSelection = () => {
    setSelectedCharacterId(null);
    setCharacterDetails(null);
  };

  useEffect(() => {
    setLoading(true);
    handleSearch(userInput);
  }, [userInput, pageSize]);

  const handleSearch = (userInput: string) => {
    localStorage.setItem('userInput', userInput);
    setUserInput(userInput);
    setResults([]);
    setError(null);
    setCurrentPage(1);
    setLoading(true);
    fetchCharacterByPage(userInput, 1, pageSize)
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    fetchCharacter(userInput)
      .then((data) => setResults(data.results))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoading(true);

    fetchCharacterByPage(userInput, page)
      .then((data) => {
        setResults(data.results);
        console.log(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="pagination">
          <button onClick={handlePrevPage}>Prev</button>
          <div>{currentPage}</div>
          <button onClick={handleNextPage}>Next</button>
          <select
            className="select"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <SearchForm onSearch={handleSearch} searchTerm={userInput} />
        {loading ? (
          <div className="loader"></div>
        ) : (
          <ResultsAPI
            results={results}
            error={error}
            selectedPageSize={pageSize}
            onItemClick={handleSelectedCharacterFromResults}
          />
        )}
      </div>
      {selectedCharacterId && characterDetails && (
        <Details
          characterDetails={characterDetails}
          onClose={handleClearSelection}
        />
      )}
    </div>
  );
};
