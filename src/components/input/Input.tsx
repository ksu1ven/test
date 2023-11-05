import { ChangeEvent, MouseEvent, useState } from 'react';
import './input.css';

interface Props {
  callback: (InputName: string) => void;
  default: string;
}

export function Input(props: Props) {
  const [input, setInput] = useState(
    props.default || localStorage.getItem('name') || ''
  );
  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    setInput(event.currentTarget.value);
  }

  function onClick(event: MouseEvent<HTMLElement>): void {
    event.preventDefault();
    props.callback(input.trim());
    localStorage.setItem('name', input.trim());
  }

  return (
    <form className="form">
      <input
        placeholder="enter a name"
        onChange={onChange}
        value={input}
      ></input>
      <button type="submit" onClick={onClick}>
        search
      </button>
    </form>
  );
}
