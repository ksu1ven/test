import React from 'react';
import { Props, State } from './types/types';
import { Post } from './components/Post';
import './App.css';
import { Input } from './components/Input';
import { Pagination } from './components/Pagination';

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      people: [],
      isLoading: false,
      previous: '',
      next: '',
    };
  }

  getAllItems = () => {
    fetch('https://swapi.dev/api/people/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          people: data.results,
          isLoading: false,
          next: data.next,
          previous: data.previous,
        });
      });
  };

  getItem = (name: string) => {
    fetch(`https://swapi.dev/api/people/?search=${name}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          people: data.results,
          isLoading: false,
          next: data.next,
          previous: data.previous,
        });
      });
  };

  componentDidMount(): void {
    this.setState({ isLoading: true });
    if (localStorage.getItem('name')) {
      this.getItem(localStorage.getItem('name') || '');
    } else {
      this.getAllItems();
    }
  }

  getInputName = (inputName: string) => {
    this.setState({ isLoading: true });
    this.getItem(inputName);
  };

  render() {
    return (
      <div className="app">
        <h1 className="title">The Star Wars Hero</h1>
        <Input callback={this.getInputName} />
        {this.state.isLoading ? (
          <p className="loading">loading...</p>
        ) : (
          this.state.people.map((person) => (
            <Post
              key={person.url}
              name={person.name}
              eye_color={person.eye_color}
              gender={person.gender}
              hair_color={person.hair_color}
              height={person.height}
              birth_year={person.birth_year}
            />
          ))
        )}
        {!this.state.isLoading && this.state.people.length === 0 && (
          <p className="incorrect-name">Incorrect name</p>
        )}
        <Pagination />
      </div>
    );
  }
}
