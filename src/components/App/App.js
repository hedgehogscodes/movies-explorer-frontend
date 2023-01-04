import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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
import { moviesList } from '../../utils/constants';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const [movies, setMovies] = useState(null);

  const closeAllPopups = () => {
    setIsMobileNavigationOpen(false);
  }

  const handleNavigationClick = () => setIsMobileNavigationOpen(true);

  useEffect(() => {
    setMovies(moviesList);
  }, [])

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header
            isLoggedIn={isLoggedIn}
            onMenuClick={handleNavigationClick}
          />
          <Main />
          <Footer />
        </Route>

        <Route path="/movies">
          <Header
            isLoggedIn={isLoggedIn}
            onMenuClick={handleNavigationClick}
          />
          <Movies movies={movies}/>
          <Footer />
        </Route>

        <Route path="/saved-movies">
          <Header
            isLoggedIn={isLoggedIn}
            onMenuClick={handleNavigationClick}
          />
          <SavedMovies movies={movies}/>
          <Footer />
        </Route>

        <Route path="/profile">
          <Header
            isLoggedIn={isLoggedIn}
            onMenuClick={handleNavigationClick}
          />
          <Profile />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/">
          <NotFound />
        </Route>

      </Switch>
      {isLoggedIn && <Popup isOpen={isMobileNavigationOpen} onClose={closeAllPopups} />}
    </div>
  );
}

export default App;
