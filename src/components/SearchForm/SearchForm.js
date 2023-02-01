import { memo, useState, useRef } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import "./SearchForm.css";

function SearchForm ({ onSubmit, onCheck }) {
  const [searchParameter, setSearchParameter] = useState('')
  const checkbox = useRef();

  const handleChange = (e) => {
    setSearchParameter(e.target.value);
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(searchParameter);
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-box">
          <label className="search-form__label-input">
            <input
              className="search-form__input"
              type="text"
              id="movie"
              placeholder="Фильм"
              value={searchParameter}
              onChange={handleChange}
              required
            />
          </label>
          <button className="search-form__button" type="submit" title='Найти'></button>
        </div>
        <FilterCheckbox inputRef={checkbox} onCheck={onCheck}/>
      </form>

    </div>
  )
}

export default memo(SearchForm);