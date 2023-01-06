import { memo } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ movies }) {
  return (
    <main className="movies">
      <SearchForm />
      {movies && <MoviesCardList moviesList={movies} buttonClassName='movies-grid__button_action_save'/>}
      <button className="movies__load-button" type="button">Ещё</button>
    </main>
  )
}

export default memo(Movies);