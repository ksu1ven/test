import React, { Component } from 'react';
import { Results } from '../types/interface';
import './Results.css';

export class ResultsAPI extends Component<{
  results: Results[];
  error: Error | null;
}> {
  render() {
    const { results, error } = this.props;

    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
          <button
            onClick={() => {
              throw new Error('Test Error');
            }}
          >
            Throw Error
          </button>
        </div>
      );
    }

    return (
      <div className="ResultsContainer">
        {results.map((result) => (
          <div key={result.id}>
            <h3>{result.name}</h3>
            <img src={result.sprites.front_default} alt={result.name} />
          </div>
        ))}
      </div>
    );
  }
}
