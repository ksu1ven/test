import React, { ChangeEvent, MouseEvent } from 'react';
import './input.css';

interface State {
  InputName: string;
}

interface Props {
  callback: (InputName: string) => void;
}

export class Input extends React.Component<Props, State> {
  callback: (name: string) => void;
  constructor(props: Props) {
    super(props);
    this.state = {
      InputName: localStorage.getItem('name') || '',
    };
    this.callback = props.callback;
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ InputName: event.currentTarget.value });
  };

  onClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    this.callback(this.state.InputName.trim());
    localStorage.setItem('name', this.state.InputName.trim());
  };

  render() {
    return (
      <form className="form">
        <input
          placeholder="enter a name"
          onChange={this.onChange}
          value={this.state.InputName}
        ></input>
        <button type="submit" onClick={this.onClick}>
          search
        </button>
      </form>
    );
  }
}
