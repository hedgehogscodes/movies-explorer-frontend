import { memo } from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <nav>
      <ul className="navtab">
        <li>
          <a href="/#about-project" className="navtab__link">О проекте</a>
        </li>
        <li>
          <a href="/#techs" className="navtab__link">Технологии</a>
        </li>
        <li>
          <a href="/#about-me" className="navtab__link">Студент</a>
        </li>
      </ul>
    </nav>
  )
}

export default memo(NavTab);