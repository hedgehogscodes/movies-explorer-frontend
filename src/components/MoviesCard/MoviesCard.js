import { memo } from 'react';
import './MoviesCard.css';
import { convertMovieDuration } from '../../utils/utils';
import { OUTSIDE_URL } from '../../config';

function MoviesCard({ movie, savedMovies, onClick, buttonClassName}) {
  const imageUrl = movie.image.url ? OUTSIDE_URL + movie.image.url : movie.image;
  const trailer = movie.trailerLink && movie.trailerLink.includes('http', 0) ? movie.trailerLink : 'http://movies.hedgehog.nomoredomains.club/error404';
  const movieDuration = convertMovieDuration(movie.duration);
  let isSaved = null;
  if(savedMovies){
    isSaved = savedMovies?.some((item) => (item.movieId === movie.id));
  }else{
    isSaved = true;
  }

  function handleMovieButtonClick(){
    onClick(movie, isSaved)
  }
  return (
    <li className="movies-grid__item">
      <div className="movies-grid__box">
        <div className="movies-grid__info">
          <h2 className="movies-grid__title" title={movie.nameRU}>{movie.nameRU}</h2>
          <p className="movies-grid__duration">{movieDuration}</p>
        </div>
        <button className={`movies-grid__button ${isSaved ? buttonClassName : ''}`} type="button" onClick={handleMovieButtonClick} title={isSaved ? 'Удалить из сохранённых' : 'Добавить в сохранённые'}/>
      </div>
      <a href={trailer} target='_blank' rel="noreferrer" title="Посмотреть трейлер">
        <img className="movies-grid__image" src={imageUrl} alt={movie.nameRU} />
      </a>
    </li>
  )
}

export default memo(MoviesCard);