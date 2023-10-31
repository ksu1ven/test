import React, { Component } from 'react';
import { Results } from '../types/interface';
import './Results.css';

export class ResultsAPI extends Component<{
  results: Results[];
  error: Error | null;
}> {
  render() {
    const { results } = this.props;

    return (
      <div className="ResultsContainer">
        {results.map((result) => (
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
  }
}
