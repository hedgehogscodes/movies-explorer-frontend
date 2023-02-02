import { memo, useEffect, useState, useContext } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { applyDurationFilter } from '../../utils/utils';
import { DEFAULT_WIDTH, AVERAGE_WIDTH, MOVIES_DEFAULT_COUNT, MOVIES_AVERAGE_COUNT, MOVIES_SMALL_COUNT, ADD_DEFAULT_COUNT, ADD_AVERAGE_COUNT, ADD_SMALL_COUNT} from '../../config';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { StoredDataContext } from '../../contexts/StoredDataContext';
import Preloader from '../Preloader/Preloader';

function Movies({ movies, savedMovies, onSubmit, onClick}) {
  const isLoading = useContext(IsLoadingContext);
  const { storedCheckboxState } = useContext(StoredDataContext) || false;
  const [moviesList, setMoviesList] = useState([]);
  const [moviesInitCount, setMoviesInitCount] = useState(0);
  const [moviesAddCount, setMoviesAddCount] = useState(0);
  const [isChecked, setIsChecked] = useState(storedCheckboxState);
  const [message, setMessage] = useState('Начните искать фильмы')

  const handleSearch = (searchParameter, checkboxState) => {
    setMessage('Ничего не нашлось');
    onSubmit(searchParameter, checkboxState);
  }

  const handleFilterCheckbox = (check) => {
    if(moviesList.length > 0){
      setMessage('Ничего не нашлось');
    }
    setIsChecked(check);
    localStorage.setItem('checkboxState', JSON.stringify(check));
  }

  const handleAdd = () => {
    const selectedMovies = isChecked ? applyDurationFilter(movies) : movies;
    setMoviesList(selectedMovies?.slice(0, moviesList.length + moviesAddCount));
  }

  useEffect(() => {
    const setCounts = () => {
      if (window.innerWidth >= DEFAULT_WIDTH && moviesInitCount !== MOVIES_DEFAULT_COUNT) {
        setMoviesInitCount(MOVIES_DEFAULT_COUNT);
        setMoviesAddCount(ADD_DEFAULT_COUNT);
      } else if (window.innerWidth >= AVERAGE_WIDTH && window.innerWidth < DEFAULT_WIDTH && moviesInitCount !== MOVIES_AVERAGE_COUNT) {
        setMoviesInitCount(MOVIES_AVERAGE_COUNT);
        setMoviesAddCount(ADD_AVERAGE_COUNT);
      } else if (window.innerWidth < AVERAGE_WIDTH && moviesInitCount !== MOVIES_SMALL_COUNT) {
        setMoviesInitCount(MOVIES_SMALL_COUNT);
        setMoviesAddCount(ADD_SMALL_COUNT);
      }
    }
  
    setCounts();
    const selectedMovies = isChecked ? applyDurationFilter(movies) : movies;
    setMoviesList(selectedMovies.slice(0, moviesInitCount));
    window.addEventListener('resize', setCounts);

    return () => window.removeEventListener('resize', setCounts);
  }, [movies, moviesInitCount, isChecked])

  return (
    <main className="movies">
      <SearchForm onSubmit={handleSearch} onCheck={handleFilterCheckbox} isSavedMoviesOpen={false}/>
      { isLoading ? (<Preloader />) : 
        moviesList.length > 0 ? 
          (<MoviesCardList moviesList={moviesList} savedMovies={savedMovies} onClick={onClick} buttonClassName='movies-grid__button_action_save'/>) : 
          (<span className="movies__result-text">{message}</span>)
      }
      { !isLoading && movies.length > moviesList.length && moviesList.length >= moviesInitCount &&
        (<button className="movies__load-button" type="button" onClick={handleAdd}>Ещё</button>)
      }
    </main>
  )
}

export default memo(Movies);