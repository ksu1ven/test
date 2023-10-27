import React, { Component } from 'react';
import { Greeting } from './test';
import SearchForm from './SearchForm';

interface AppState {
  userInput: string;
}
class App extends Component<object, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      userInput: localStorage.getItem('userInput') || '',
    };
  }
  handleSearch = (userInput: string) => {
    userInput = userInput.trim();
    localStorage.setItem('userInput', userInput);
    this.setState({ userInput });
  };

  render() {
    const { userInput }: AppState = this.state;
    return (
      <div>
        <SearchForm onSearch={this.handleSearch} searchTerm={userInput} />
        <Greeting name={userInput} />
      </div>
    );
  }
}

export default App;
