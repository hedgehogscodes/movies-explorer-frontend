import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ moviesList, savedMovies, onClick, buttonClassName }) {
  return (
      <ul className="movies-grid__list">
        {moviesList.map(movie => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            savedMovies={savedMovies}
            onClick={onClick}
            buttonClassName={buttonClassName}
          />
        ))}
      </ul>
  )
}

export default memo(MoviesCardList);