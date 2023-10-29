import React, { Component } from 'react';
import { Greeting } from './test';
import SearchForm from './components/SearchForm';
import { ResultsAPI } from './components/Results';
import { AppState } from './types/interface';

class App extends Component<object, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      userInput: localStorage.getItem('userInput') || '',
      results: [],
      error: null,
    };
  }
  handleSearch = (userInput: string) => {
    userInput = userInput.trim();
    localStorage.setItem('userInput', userInput);
    this.setState({ userInput, results: [], error: null });
    if (userInput) {
      fetch(`https://pokeapi.co/api/v2/${userInput}`)
        .then((response) => response.json())
        .then((data) => this.setState({ results: [data] }))
        .catch((error) => this.setState({ error }));
    }
  };
  // fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
  //       .then((response) => response.json())
  //       .then((data) => console.log(data))

  render() {
    const { userInput, results, error }: AppState = this.state;
    return (
      <div>
        <SearchForm onSearch={this.handleSearch} searchTerm={userInput} />
        <Greeting name={userInput} />
        <ResultsAPI results={results} error={error} />
      </div>
    );
  }
}

export default App;
