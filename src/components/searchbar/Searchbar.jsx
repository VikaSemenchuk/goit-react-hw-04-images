import PropTypes from 'prop-types';
import { Component } from 'react';
import { Search, SearchForm } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ search: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      return toast.warning('Please enter some information for search');
    }

    this.props.onSubmit(this.state.search);
  };

  render() {
    const { search } = this.state;
    return (
      <Search>
        <SearchForm onSubmit={this.handleSubmit}>
          <button type="submit">
            <FcSearch size="18" />
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={search}
          />
        </SearchForm>
      </Search>
    );
  }
}
