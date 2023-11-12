import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './input.css';
import { CustomContext } from '../../context';

export function Input() {
  const { searchText, setSearchText } = useContext(CustomContext);
  const [inputValue, setInputValue] = useState(searchText);

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.currentTarget.value);
  }

  function onSubmit(event: FormEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setSearchText(inputValue.trim());
    console.log(inputValue);
    localStorage.setItem('name', inputValue.trim());
  }

  return (
    <form className="form">
      <input
        placeholder="enter a name"
        onChange={onChange}
        value={inputValue}
      ></input>
      <button type="submit" onClick={onSubmit}>
        search
      </button>
    </form>
  );
}
