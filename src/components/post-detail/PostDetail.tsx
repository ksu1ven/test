import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hero } from '../../types/types';
import './postDetail.css';

export function PostDetail() {
  const { id } = useParams();
  const [hero, setHero] = useState<Hero>({
    name: '',
    birth_year: '',
    eye_color: '',
    gender: '',
    hair_color: '',
    height: '',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    fetch(`https://swapi.dev/api/people/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHero(data);
        setIsLoaded(false);
      });
  }, [id]);

  return (
    <>
      {isLoaded ? (
        <p className="post-loading">loading...</p>
      ) : (
        <div className="post-detail">
          <h2>{hero.name}</h2>
          <p>birth_year: {hero.birth_year}</p>
          <p>height: {hero.height}</p>
          <p>gender: {hero.gender}</p>
          <p>eye_color: {hero.eye_color}</p>
          <p>hair_color: {hero.hair_color}</p>
        </div>
      )}
    </>
  );
}
