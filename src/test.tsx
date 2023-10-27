import { Component } from 'react';

interface GreetingProps {
  name: string;
}
export class Greeting extends Component<GreetingProps> {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
