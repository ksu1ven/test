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
      loading: false,
    };
  }

  componentDidMount() {
    const { userInput } = this.state;
    this.setState({ loading: true });
    this.performSearch(userInput);
  }

  handleSearch = (userInput: string) => {
    userInput = userInput.trim();
    localStorage.setItem('userInput', userInput);
    this.setState({ userInput, results: [], error: null, loading: true });
    if (userInput) {
      fetch(`${API_URL}${userInput}`)
        .then((response) => response.json())
        .then((data) => this.setState({ results: data.results }))
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  };

  performSearch = (userInput: string) => {
    this.setState({ loading: true });
    if (!userInput) {
      fetch(`${API_URL}${userInput}`)
        .then((response) => response.json())
        .then((data) => this.setState({ results: data.results }))
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    } else {
      fetch(`${API_URL}${userInput}`)
        .then((response) => response.json())
        .then((data) => this.setState({ results: data.results }))
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  };

  render() {
    const { userInput, results, error, loading }: AppState = this.state;

    return (
      <div>
        <SearchForm onSearch={this.handleSearch} searchTerm={userInput} />
        {loading ? (
          <div className="loader"></div>
        ) : (
          <ResultsAPI results={results} error={error} />
        )}
      </div>
    );
  }
}

export default App;
