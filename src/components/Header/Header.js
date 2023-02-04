import { memo, useContext } from 'react'; 
import './Header.css';
import Navigation from '../Navigation/Navigation';
import DefaultNavigation from '../DefaultNavigation/DefaultNavigation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


import Logo from '../Logo/Logo';

function Header({ onMenuClick }) {
  const isLoggedIn = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Logo />

      {isLoggedIn ? (
        <Navigation 
          onMenuClick={onMenuClick}
        />
      ) : (
        <DefaultNavigation />
      )}

    </header>
  )
}

export default memo(Header);