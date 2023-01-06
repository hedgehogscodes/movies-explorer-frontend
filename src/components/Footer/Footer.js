import { memo } from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__info">
        <p className="footer__copyright">&#169; 2023</p>
        <p className="footer__author">Pogosyan Zhora</p>
        <a href="https://github.com/hedgehogscodes" className="footer__link" target="blank">Github</a>
      </div>
    </footer>
  )
}

export default memo(Footer);
