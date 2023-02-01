import { memo, useEffect, useState, } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { applyDurationFilter, applyNameFilter} from '../../utils/utils';

function SavedMovies({ savedMovies, onClick  }) {
  const initMessage = 'Здесь будут сохранённые вами фильмы';
  const notFoundMessage = 'Ничего не нашлось';
  const [moviesList, setMoviesList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState(initMessage);
  const [searchParameter, setSearchParameter] = useState(null);

  const handleSearch = (searchParameter) => {
    if(savedMovies.length > 0){
      setMessage(notFoundMessage);
      setSearchParameter(searchParameter);
    } else {
      setMessage(initMessage);
    }
    return
  }

  const handleFilterCheckbox = (check) => {
    if(moviesList.length > 0 && savedMovies.length > 0){
      setMessage(notFoundMessage);
    }else{
      setMessage(initMessage);
    }
    setIsChecked(check);
  }

  useEffect(() => {
    let selectedMovies = [];
    selectedMovies = isChecked ? applyDurationFilter(savedMovies) : savedMovies;
    selectedMovies = searchParameter ? applyNameFilter(selectedMovies, searchParameter) : selectedMovies;
    setMoviesList(selectedMovies);
  }, [savedMovies, isChecked, searchParameter])

  return (
    <main className="movies">
      <SearchForm onSubmit={handleSearch} onCheck={handleFilterCheckbox}/>
      {moviesList.length > 0 ? 
        (<MoviesCardList moviesList={moviesList} onClick={onClick} buttonClassName='movies-grid__button_action_delete'/>) :
        (<span className="movies__result-text">{message}</span>)
      }
    </main>
  )
}

export default memo(SavedMovies);
