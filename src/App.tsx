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
      inputName: '',
    };
  }

  //  https://swapi.dev/api/people/?search=r2-d2

  componentDidMount(): void {
    this.setState({ isLoading: true });
    fetch('https://swapi.dev/api/people/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ people: data.results });
        this.setState({ isLoading: false });
        console.log(data.results);
      });
  }

  getInputName = (InputName: string) => {
    this.setState({ inputName: InputName });
  };

  render() {
    return (
      <>
        <Input callback={this.getInputName} />
        <h1>people</h1>
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
      </>
    );
  }
}
