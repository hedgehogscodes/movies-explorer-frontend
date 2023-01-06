import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ moviesList, buttonClassName }) {
  return (
      <ul className="movies-grid__list">
        {moviesList.map(movie => (
          <MoviesCard
            key={movie._id}
            movie={movie}
            buttonClassName={buttonClassName}
          />
        ))}
      </ul>
  )
}

export default memo(MoviesCardList);