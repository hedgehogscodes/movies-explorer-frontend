import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import "./SearchForm.css";

function SearchForm () {
  return (
    <div className="search-container">
      <form className="search-form">
        <div className="search-box">
          <label className="search-form__label-input">
            <input
              className="search-form__input"
              type="text"
              id="movie"
              placeholder="Фильм"
              required
            />
          </label>
          <button className="search-form__button" type="submit" title='Найти'></button>
        </div>
        <FilterCheckbox />
      </form>

    </div>
  )
}

export default SearchForm