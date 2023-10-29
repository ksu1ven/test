import React from "react";

type Props = {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitSearch: () => void;
};

class Search extends React.Component<Props> {
  render() {
    return (
      <div className="search__wrapper">
        <span className="search__text">Search by name:</span>
        <input
          className="search__input"
          type="text"
          value={this.props.inputValue}
          onChange={this.props.onInputChange}
        />
        <button className="search__button" onClick={this.props.submitSearch}>
          Submit
        </button>
      </div>
    );
  }
}

export default Search;
