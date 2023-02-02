import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { FormMessageContext } from '../../contexts/FormMessageContext';
import { StoredDataContext } from '../../contexts/StoredDataContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import { successMessage, errorMessages, applyNameFilter, getStoredData } from "../../utils/utils";
import Preloader from '../Preloader/Preloader';

function App() {

  //--------Состояния с данными текущего пользователя, всех фильмов и сохраненных фильмов ----------------------------------------
  const [currentUser, setCurrentUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [storedData, setStoredData] = useState(null);
  //------------------------------------------------------------------------------------------------------------------------------

  //--------Состояние мобильной навигации ----------------------------------------------------------------------------------------
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  //------------------------------------------------------------------------------------------------------------------------------

  //--------Состояния выполнения запросов ----------------------------------------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [isSetuping, setIsSetuping] = useState(true);
  //------------------------------------------------------------------------------------------------------------------------------

  //--------Состояние сообщения в форму после выполнения запроса -----------------------------------------------------------------
  const [formMessage, setFormMessage] = useState(null);
  //------------------------------------------------------------------------------------------------------------------------------

  const history = useHistory();


  //--------Обработчики меняющие состояния ---------------------------------------------------------------------------------------
  function closeAllPopups() {
    setIsMobileNavigationOpen(false);
  }

  function handleNavigationClick() {
    setIsMobileNavigationOpen(true);
  }

  function handleResetFormMessage() {
    setFormMessage(null);
  }
  //------------------------------------------------------------------------------------------------------------------------------

  //--------Функция для загрузки данных пользователя -----------------------------------------------------------------------------
  function uploadData() {
    setIsSetuping(true);
    const promises = [mainApi.getUserInfo(), mainApi.getSavedMovies()];
    Promise.all(promises)
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSetuping(false);
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------

  //--------Обработчики регистрации, авторизации и выхода-------------------------------------------------------------------------
  function handleRegister( name, email, password ) {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((data) => {
        setFormMessage(null);
        setIsLoading(false)
        handleLogin(email, password);
      })
      .catch((err) => {
        setIsLoading(false)
        if (err === 400) {
          return setFormMessage(errorMessages.validateMessage);
        }
        if (err === 409) {
          return setFormMessage(errorMessages.uniqueMailMessage);
        }
        return setFormMessage(errorMessages.defaultMessage);
      })
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi
      .authorize(email, password)
      .then((data) => {
        setFormMessage(null);
        localStorage.setItem("token", data.token);
        return uploadData();
      })
      .then(() => history.push('/movies'))
      .catch((err) => {
        if (err === 400) {
          return setFormMessage(errorMessages.validateMessage);
        }
        if (err === 401) {
          return setFormMessage(errorMessages.incorrectDataMessage);
        }
        return setFormMessage(errorMessages.defaultMessage);
      })
      .finally(() => setIsLoading(false));
  }

  function signOut() {
    setCurrentUser(null);
    setMovies([]);
    setSavedMovies([])
    localStorage.removeItem('movies');
    localStorage.removeItem('searchParameter');
    localStorage.removeItem('checkboxState');
    localStorage.removeItem("token");
    history.push("/");
  }
  //------------------------------------------------------------------------------------------------------------------------------

  //--------Обработчик обновления данных пользователя-----------------------------------------------------------------------------
  const handleUpdateUser = (name, email) => {
    setIsLoading(true);
    mainApi
      .saveUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setFormMessage(successMessage.successMessage);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        if (err === 400) {
          return setFormMessage(errorMessages.validateMessage);
        }
        if (err === 409) {
          return setFormMessage(errorMessages.uniqueMailMessage);
        }
        return setFormMessage(errorMessages.defaultMessage);
      })
  }
  //------------------------------------------------------------------------------------------------------------------------------

  //--------Обработчик поиска фильмов по заданному параметру ---------------------------------------------------------------------
  function handleSearchSubmit(searchParameter, checkboxState) {
    const { storedMovies } = getStoredData();
    localStorage.setItem('searchParameter', searchParameter);
    localStorage.setItem('checkboxState', JSON.stringify(checkboxState));

    if (storedMovies) {
      return setMovies(applyNameFilter(storedMovies, searchParameter));
    }
    
    setIsLoading(true);
    moviesApi
      .getAllMovies()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));
        setMovies(applyNameFilter(res, searchParameter));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  //------------------------------------------------------------------------------------------------------------------------------

  //--------Обработчик сохранения фильмов и удаления из сохранений ---------------------------------------------------------------
  function handleMovieButtonClick(movie, isSaved) {
    if(isSaved){
      const movieId = movie._id || savedMovies.find((item) => item.movieId === movie.id)._id;
      mainApi
        .deleteMovie(movieId)
        .then(() =>
          setSavedMovies((state) =>
            state.filter((item) =>
              item._id !== movieId)))
        .catch((err) => console.log(err));
    }else{
      mainApi
        .saveMovie(movie)
        .then((res) => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.log(err));
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const { storedMovies, storedSearch, storedCheckboxState } = getStoredData();
    if(storedMovies){
      setMovies(applyNameFilter(storedMovies, storedSearch));
      setStoredData({ storedMovies, storedSearch, storedCheckboxState });
    }
    uploadData();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoadingContext.Provider value={isLoading}>
        <StoredDataContext.Provider value={storedData}>
          <FormMessageContext.Provider value={{formMessage, handleResetFormMessage}}>
            <div className="page">
              {!isSetuping ? (
                <Switch>
                  <Route exact path="/">
                    <Header
                      onMenuClick={handleNavigationClick}
                    />
                    <Main />
                    <Footer />
                  </Route>

                  <ProtectedRoute exact path="/movies">
                    <Header
                      onMenuClick={handleNavigationClick}
                    />
                    <Movies 
                      movies={movies}
                      savedMovies={savedMovies}
                      onSubmit={handleSearchSubmit}
                      onClick={handleMovieButtonClick}
                    />
                    <Footer />
                  </ProtectedRoute>

                  <ProtectedRoute exact path="/saved-movies">
                    <Header
                      onMenuClick={handleNavigationClick}
                    />
                    <SavedMovies 
                      savedMovies={savedMovies}
                      onClick={handleMovieButtonClick}
                    />
                    <Footer />
                  </ProtectedRoute>

                  <ProtectedRoute exact path="/profile">
                    <Header
                      onMenuClick={handleNavigationClick}
                    />
                    <Profile 
                      signOut={signOut}
                      onSubmit={handleUpdateUser}
                    />
                  </ProtectedRoute>

                  <Route exact path="/signup">
                    {!currentUser
                      ? <Register handleRegister={handleRegister}/>
                      : <Redirect to="/movies" />
                    }
                  </Route>

                  <Route exact path="/signin">
                    {!currentUser
                      ? <Login handleLogin={handleLogin}/>
                      : <Redirect to="/movies" />
                    }
                  </Route>

                  <Route>
                    <NotFound />
                  </Route>
                </Switch> ) :
                (<Preloader />)
              }

              {currentUser && <Popup isOpen={isMobileNavigationOpen} onClose={closeAllPopups} />}
            </div>
          </FormMessageContext.Provider>
        </StoredDataContext.Provider>
      </IsLoadingContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
