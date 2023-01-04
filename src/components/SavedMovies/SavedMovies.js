import { memo } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ movies }) {
  const savedMovies = movies?.filter(item => item.isSaved === true);

  return (
    <main className="movies">
      <SearchForm />
      {savedMovies && <MoviesCardList moviesList={savedMovies} buttonClassName='movies-grid__button_action_delete'/>}
    </main>
  )
}

export default memo(SavedMovies);
