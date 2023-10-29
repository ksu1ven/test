import React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import { ResultsAPI } from './components/Results';
import { AppState } from './types/interface';
import './App.css';
import { API_URL } from './constants/api';

class App extends Component<object, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      userInput: localStorage.getItem('userInput') || '',
      results: [],
      error: null,
    };
  }

  componentDidMount() {
    const { userInput } = this.state;
    this.performSearch(userInput);
  }

  handleSearch = (userInput: string) => {
    userInput = userInput.trim();
    localStorage.setItem('userInput', userInput);
    this.setState({ userInput, results: [], error: null });
    if (userInput) {
      fetch(`${API_URL}${userInput}`)
        .then((response) => response.json())
        .then((data) => this.setState({ results: data.results }))
        .catch((error) => this.setState({ error }));
    }
  };

  performSearch = (userInput: string) => {
    if (!userInput) {
      fetch(`${API_URL}${userInput}`)
        .then((response) => response.json())
        .then((data) => this.setState({ results: data.results }))
        .catch((error) => this.setState({ error }));
    } else {
      fetch(`${API_URL}${userInput}`)
        .then((response) => response.json())
        .then((data) => this.setState({ results: data.results }))
        .catch((error) => this.setState({ error }));
    }
  };

  render() {
    const { userInput, results, error }: AppState = this.state;

    return (
      <div>
        <SearchForm onSearch={this.handleSearch} searchTerm={userInput} />
        <ResultsAPI results={results} error={error} />
      </div>
    );
  }
}

export default App;
