import { memo } from 'react'; 
import './Header.css';
import Navigation from '../Navigation/Navigation';
import DefaultNavigation from '../DefaultNavigation/DefaultNavigation';


import Logo from '../Logo/Logo';

function Header({ isLoggedIn, onMenuClick }) {

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