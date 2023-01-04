import { memo } from 'react';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';
import photo from '../../images/photo.jpg'

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="section-title">Студент</h2>
      <div className="about-me__card">
        <div className="about-me__info">
          <h3 className="about-me__name">Жора</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 21 год</p>
          <p className="about-me__description">
            Я родился в Армениии живу в городе Орёл. Учусь на программиста с 2019 года в ОГУ имени И.С. Тургенева. За все время обучения познакомился с многими языками(C/C++, Java, Python) и создал свои ПО. Сейчас активно занимаюсь разработкой веб-приложений. Мне нравится создавать что-то новое.
          </p>
          <a href="https://github.com/hedgehogscodes" className="about-me__link" target="blank">Github</a>
        </div>
        <img className="about-me__photo" src={photo} alt="Фото студента"/>
      </div>
      <Portfolio />
    </section>
  )
}

export default memo(AboutMe);
