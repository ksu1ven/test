import React, { ChangeEvent, Component } from 'react';
import { SearchFormProps, SearchFormState } from '../types/interface';

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      searchTerm: props.searchTerm || '',
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    return (
      <div className="SearchFormContainer">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchForm;
