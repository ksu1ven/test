import { People } from '../../types/types';
import './posts.css';

export function Post(props: People) {
  return (
    <div className="post">
      <h1>{props.name}</h1>
      <div>
        <p>birth_year: {props.birth_year}</p>
        <p>height: {props.height}</p>
        <p>gender: {props.gender}</p>
        <p>eye_color: {props.eye_color}</p>
        <p>hair_color: {props.hair_color}</p>
      </div>
    </div>
  );
}
