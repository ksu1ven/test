import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Hero } from '../../types/types';
import './postDetail.css';

export function PostDetail() {
  const { id } = useParams();
  const [setIsOpened] = useOutletContext<[(isOpened: boolean) => void]>();
  setIsOpened(true);
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
        <p className="post-loading hero">loading...</p>
      ) : (
        <div className="post-detail hero">
          <h2 className="hero">{hero.name}</h2>
          <p className="hero">birth_year: {hero.birth_year}</p>
          <p className="hero">height: {hero.height}</p>
          <p className="hero">gender: {hero.gender}</p>
          <p className="hero">eye_color: {hero.eye_color}</p>
          <p className="hero">hair_color: {hero.hair_color}</p>
        </div>
      )}
    </>
  );
}
