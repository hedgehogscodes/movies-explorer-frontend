import { memo } from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, buttonClassName}) {
  return (
    <li className="movies-grid__item">
      <div className="movies-grid__box">
        <div className="movies-grid__info">
          <h2 className="movies-grid__title" title={movie.nameRU}>{movie.nameRU}</h2>
          <p className="movies-grid__duration">{movie.duration}</p>
        </div>
        <button className={`movies-grid__button ${movie.isSaved ? buttonClassName : ''}`} type="button"/>
      </div>
      <img className="movies-grid__image" src={movie.image} alt={movie.nameRU} />
    </li>
  )
}

export default memo(MoviesCard);