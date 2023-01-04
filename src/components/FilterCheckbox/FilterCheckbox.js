import { memo } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter-box">
      <label htmlFor="filter-checkbox" className="filter-checkbox">
        <input
          className="filter-checkbox__invisible-checkbox"
          type="checkbox"
          id="filter-checkbox"
        />
        <span className="filter-checkbox__visible-checkbox" />
        Короткометражки
      </label>
    </div>
  )
}

export default memo(FilterCheckbox);
