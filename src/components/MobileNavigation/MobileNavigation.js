import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import './MobileNavigation.css';

function MobileNavigation({ onClose }) {
  const handleClose = (evt) => onClose();

  return (
    <nav className="mobile-nav">
      <ul className="mobile-nav-list">
        <li className="mobile-nav-item">
          <NavLink exact to="/" className="mobile-nav__link" activeClassName="mobile-nav__link_active" onClick={handleClose}>Главная</NavLink>
        </li>

        <li className="mobile-nav-item">
          <NavLink to="/movies" className="mobile-nav__link" activeClassName="mobile-nav__link_active" onClick={handleClose}>Фильмы</NavLink>
        </li>

        <li className="mobile-nav-item">
          <NavLink to="/saved-movies" className="mobile-nav__link" activeClassName="mobile-nav__link_active" onClick={handleClose}>Сохранённые фильмы</NavLink>
        </li>

        <li className="mobile-nav-item">
          <NavLink to="/profile" className="mobile-nav__link mobile-nav__link_type_gray-button" onClick={handleClose}>Аккаунт</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default memo(MobileNavigation);
