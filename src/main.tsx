import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/error-boundery/ErrorBoundery.tsx';
import { CustomContext } from './context.tsx';

export function Main() {
  const [searchText, setSearchText] = useState(
    localStorage.getItem('name') || ''
  );
  const [page, setPage] = useState('1');
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    fetch(`https://swapi.dev/api/people/?search=${searchText}&page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, [page, searchText]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <CustomContext.Provider
            value={{ searchText, setSearchText, data, page, setPage }}
          >
            <App />
          </CustomContext.Provider>
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main></Main>);
