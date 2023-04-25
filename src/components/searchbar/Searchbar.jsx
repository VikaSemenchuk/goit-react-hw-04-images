import { useState } from 'react';
import PropTypes from 'prop-types';

import { Search, SearchForm } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  function handleChange ({ target: { value } }) {
    setSearch(value.toLowerCase());
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (search.trim() === '') {
      return toast.warning('Please enter some information for search');
    }

    onSubmit(search);
  }

  return (
    <Search>
      <SearchForm onSubmit={handleSubmit}>
        <button type="submit">
          <FcSearch size="18" />
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={search}
        />
      </SearchForm>
    </Search>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
