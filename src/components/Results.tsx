import { Results, ResultsAPIProps } from '../types/interface';
import './Results.css';

export const ResultsAPI = (props: ResultsAPIProps): JSX.Element => {
  return (
    <div className="ResultsContainer">
      {props.results.map((result: Results) => (
        <div key={result.url}>
          <h3>Name: {result.name}</h3>
          <img src={result.image} alt={result.name} />
          <h3>Species: {result.species}</h3>
          <h3>Status: {result.status}</h3>
          <h3>Location: {result.location.name}</h3>
        </div>
      ))}
    </div>
  );
};
