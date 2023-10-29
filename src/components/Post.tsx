import React from 'react';
import { People } from '../types/types';
import './posts.css';

export class Post extends React.Component<People> {
  render() {
    return (
      <div className="post">
        <h1>{this.props.name}</h1>
        <div>
          <p>birth_year: {this.props.birth_year}</p>
          <p>height: {this.props.height}</p>
          <p>gender: {this.props.gender}</p>
          <p>eye_color: {this.props.eye_color}</p>
          <p>hair_color: {this.props.hair_color}</p>
        </div>
      </div>
    );
  }
}
