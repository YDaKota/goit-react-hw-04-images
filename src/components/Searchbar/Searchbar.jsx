import { useState } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';


const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('You cannot find an empty field', {
        theme: 'colored',
      });
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={style.SearchFormButton}>
            <BsSearch style={{ width: 20, height: 20 }} />
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }

export default Searchbar;

Searchbar.propTypes= {
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}