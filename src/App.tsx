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
import { ResultContext, SearchContext } from './utils/Context';
import Pagination from './components/Pagination';

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
      .catch((error) => {
        setError(error);
        setResults([]);
      })
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

  return (
    <div className="app-container">
      <div className="left-panel">
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalResults={results.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
        <SearchContext.Provider
          value={{
            onSearch: handleSearch,
            searchTerm: userInput,
          }}
        >
          <SearchForm />
        </SearchContext.Provider>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <ResultContext.Provider
            value={{
              results,
              error,
              selectedPageSize: pageSize,
              onItemClick: handleSelectedCharacterFromResults,
            }}
          >
            <ResultsAPI />
          </ResultContext.Provider>
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
