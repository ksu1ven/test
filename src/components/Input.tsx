import React, { ChangeEvent, MouseEvent } from 'react';

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
      InputName: '',
    };
    this.callback = props.callback;
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ InputName: event.currentTarget.value });
  };

  onClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    this.callback(this.state.InputName);
  };

  render() {
    return (
      <form>
        <input placeholder="enter a name" onChange={this.onChange}></input>
        <button type="submit" onClick={this.onClick}>
          search
        </button>
      </form>
    );
  }
}
