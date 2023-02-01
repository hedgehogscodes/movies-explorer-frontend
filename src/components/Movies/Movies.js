import { memo, useEffect, useState, useContext } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { applyDurationFilter } from '../../utils/utils';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import Preloader from '../Preloader/Preloader';

function Movies({ movies, savedMovies, onSubmit, onClick}) {
  const isLoading = useContext(IsLoadingContext);
  const [moviesList, setMoviesList] = useState([]);
  const [moviesInitCount, setMoviesInitCount] = useState(0);
  const [moviesAddCount, setMoviesAddCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('Начните искать фильмы')

  const handleSearch = (searchParameter) => {
    setMessage('Ничего не нашлось');
    onSubmit(searchParameter);
  }

  const handleFilterCheckbox = (check) => {
    if(moviesList.length > 0){
      setMessage('Ничего не нашлось');
    }
    setIsChecked(check);
  }

  const handleAdd = () => {
    const selectedMovies = isChecked ? applyDurationFilter(movies) : movies;
    setMoviesList(selectedMovies?.slice(0, moviesList.length + moviesAddCount));
  }

  useEffect(() => {
    const setCounts = () => {
      if (window.innerWidth >= 1280 && moviesInitCount !== 12) {
        setMoviesInitCount(12);
        setMoviesAddCount(3);
      } else if (window.innerWidth >= 480 && window.innerWidth < 1280 && moviesInitCount !== 8) {
        setMoviesInitCount(8);
        setMoviesAddCount(2);
      } else if (window.innerWidth < 480 && moviesInitCount !== 5) {
        setMoviesInitCount(5);
        setMoviesAddCount(1);
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
      <SearchForm onSubmit={handleSearch} onCheck={handleFilterCheckbox} />
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