import { useEffect, useState } from 'react';
import { Post } from '../../components/post/Post';
import { Input } from '../../components/input/Input';
import { Hero } from '../../types/types';
import { Pagination } from '../../components/pagination/Pagination';
import './home.css';

export function Home() {
  const [herous, setHerous] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getAllHerous() {
    fetch('https://swapi.dev/api/people/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHerous(data.results);
        setIsLoaded(false);
      });
  }

  function getSearchHerous(name: string) {
    fetch(`https://swapi.dev/api/people/?search=${name}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHerous(data.results);
        setIsLoaded(false);
      });
  }

  function getInputName(input: string) {
    setIsLoaded(true);
    getSearchHerous(input);
  }

  useEffect(() => {
    setIsLoaded(true);
    if (localStorage.getItem('name')) {
      getSearchHerous(localStorage.getItem('name') || '');
    } else {
      getAllHerous();
    }
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
      <Pagination />
    </div>
  );
}
