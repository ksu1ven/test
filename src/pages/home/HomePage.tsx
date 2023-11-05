import { useEffect, useState } from 'react';
import { Post } from '../../components/post/Post';
import { Input } from '../../components/input/Input';
import { Hero } from '../../types/types';
import { Pagination } from '../../components/pagination/Pagination';
import './home.css';

export function HomePage() {
  const [herous, setHerous] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [currentPage, setCurrenPage] = useState('1');
  const [count, setCount] = useState(0);

  function getAllHerous() {
    fetch('https://swapi.dev/api/people/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setHerous(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        getCurrentPage(data.previous, data.next);
        setCount(data.count);
        setIsLoaded(false);
      });
  }

  function getSearchHerous(name: string) {
    fetch(`https://swapi.dev/api/people/?search=${name}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setHerous(data.results);
        setCount(data.count);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        getCurrentPage(data.previous, data.next);
        setIsLoaded(false);
      });
  }

  function getNextPageHerous() {
    setIsLoaded(true);
    fetch(`${nextPage}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCount(data.count);
        setHerous(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        getCurrentPage(data.previous, data.next);
        setIsLoaded(false);
      });
  }

  function getPrevPageHerous() {
    setIsLoaded(true);
    fetch(`${previousPage}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCount(data.count);
        setHerous(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        getCurrentPage(data.previous, data.next);
        setIsLoaded(false);
      });
  }

  function getInputName(input: string) {
    setIsLoaded(true);
    getSearchHerous(input);
  }

  function getCurrentPage(prev: string, next: string) {
    if (prev) {
      const currentPage = Number(prev.split('page=')[1]) + 1;
      return setCurrenPage(String(currentPage));
    } else if (next) {
      const currentPage = Number(next.split('page=')[1]) - 1;
      return setCurrenPage(String(currentPage));
    }
  }

  useEffect(() => {
    setIsLoaded(true);
    if (localStorage.getItem('name')) {
      getSearchHerous(localStorage.getItem('name') || '');
    } else {
      getAllHerous();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <h1 className="title">The Star Wars Hero</h1>
      <Input callback={getInputName} />
      {isLoaded ? (
        <p className="loading">loading...</p>
      ) : (
        herous.map((hero: Hero) => (
          <Post
            key={hero.url}
            name={hero.name}
            eye_color={hero.eye_color}
            gender={hero.gender}
            hair_color={hero.hair_color}
            height={hero.height}
            birth_year={hero.birth_year}
          />
        ))
      )}
      {!isLoaded && herous.length === 0 && (
        <p className="incorrect-name">Incorrect name</p>
      )}
      <Pagination
        currentPage={currentPage}
        isPrev={!previousPage}
        isNext={!nextPage}
        getPrevPage={getPrevPageHerous}
        getNextPage={getNextPageHerous}
        count={count}
        isLoaded={isLoaded}
      />
    </div>
  );
}
