import { Results, ResultsAPIProps } from '../types/interface';
import './Results.css';

export const ResultsAPI = (props: ResultsAPIProps): JSX.Element => {
  const { results, selectedPageSize, onItemClick } = props;
  const resultsToDisplay = selectedPageSize
    ? results.slice(0, selectedPageSize)
    : results;
  return (
    <div className="ResultsContainer">
      {resultsToDisplay.map((result: Results) => (
        <div key={result.url} onClick={() => onItemClick(result)}>
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
