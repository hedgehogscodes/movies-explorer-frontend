import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({onMenuClick}){

  const handleMenuClick = () => onMenuClick();

  return (
    <>
      <nav className="header__nav header__nav_hidden">
        <ul className="header__items">
          <li className="header__item">
            <NavLink to="/movies" className="header__link">Фильмы</NavLink>
          </li>
          <li className="header__item">
            <NavLink to="/saved-movies"className="header__link">Сохранённые фильмы</NavLink>
          </li>
          <li className="header__item">
            <NavLink to="/profile" className="header__link header__link_type_gray-button">Аккаунт</NavLink>
          </li>
        </ul>
      </nav>

      <button className="header__button" type="button" onClick={handleMenuClick} />
    </>
  )
}

export default memo(Navigation);




