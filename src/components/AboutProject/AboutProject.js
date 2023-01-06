import { memo } from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="section-title">О проекте</h2>
      <ul className="about-project__list">
        <li className="about-project__item">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__item">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="project-timeline">
        <p className="project-timeline__item project-timeline__item_theme_green">1 неделя</p>
        <p className="project-timeline__item">Back-end</p>
        <p className="project-timeline__item project-timeline__item_theme_gray">4 недели</p>
        <p className="project-timeline__item">Front-end</p>
      </div>
    </section>
  )
}

export default memo(AboutProject);