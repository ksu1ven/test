import React from 'react';
import { Props, State } from './types/types';
import { Post } from './components/Post';
import './App.css';
import { Input } from './components/Input';

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      people: [],
      isLoading: false,
    };
  }

  getAllItems = () => {
    fetch('https://swapi.dev/api/people/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ people: data.results });
        this.setState({ isLoading: false });
        console.log(data.results);
      });
  };

  getItem = (name: string) => {
    fetch(`https://swapi.dev/api/people/?search=${name}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ people: data.results });
        this.setState({ isLoading: false });
        console.log(data.results);
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
      <>
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
      </>
    );
  }
}
