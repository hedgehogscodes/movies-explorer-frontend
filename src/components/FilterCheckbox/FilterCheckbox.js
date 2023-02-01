import { memo } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ inputRef, onCheck }) {

  const handleChange = () => {
    const isChecked = inputRef.current.hasAttribute('checked');
    isChecked ? inputRef.current.removeAttribute('checked') : inputRef.current.setAttribute('checked', true);
    onCheck(!isChecked);
  }

  return (
    <div className="filter-box">
      <label htmlFor="filter-checkbox" className="filter-checkbox">
        <input
          className="filter-checkbox__invisible-checkbox"
          type="checkbox"
          id="filter-checkbox"
          onChange={handleChange}
          ref={inputRef}
        />
        <span className="filter-checkbox__visible-checkbox" />
        Короткометражки
      </label>
    </div>
  )
}

export default memo(FilterCheckbox);
