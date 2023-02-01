//////////////////URLs for APIs//////////////////////////////////////////
export const baseUrl = 'https://api.movies.hedgehog.nomoredomains.club';
export const outsideUrl = 'https://api.nomoreparties.co';
/////////////////////////////////////////////////////////////////////////

//////////////////Converter for API//////////////////////////////////////
export const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(res.status);
/////////////////////////////////////////////////////////////////////////

//////////////////Messages for forms////////////////////////////////////
export const successMessage = {
  successMessage: 'Изменения сохранены!',
}

export const errorMessages = {
  defaultMessage: 'Что-то пошло не так',
  validateMessage: 'Ошибка валидации. Введены некорректные данные',
  uniqueMailMessage: 'Данный email уже зарегистрирован',
  unauthMessage: 'Необходимо авторизоваться',
  incorrectDataMessage: 'Неправильные почта или пароль',
}
///////////////////////////////////////////////////////////////////////

//////////////////Getting data from local storage//////////////////////
export const getStoredData = (movies, searchParameter) => {
  const storedMovies = JSON.parse(localStorage.getItem('movies'));
  const storedSearch = localStorage.getItem('searchParameter') || '';
  return {storedMovies, storedSearch};
}
///////////////////////////////////////////////////////////////////////

//////////////////Filtering data///////////////////////////////////////
export const applyNameFilter = (movies, searchParameter) => {
  const selectedMovies = movies.filter((item) => {
    const tmpName = item.nameRU.toLowerCase();
    const tmpSearchParameter = searchParameter.toLowerCase();
    return tmpName.includes(tmpSearchParameter);
  })

  return selectedMovies;
}

export const applyDurationFilter = (movies) => {
  const selectedMovies = movies.filter((item) => {
    return item.duration <= 40;
  })

  return selectedMovies;
}
///////////////////////////////////////////////////////////////////////

//////////////////Duration converter///////////////////////////////////
export const convertMovieDuration = (duration) => {
  if (duration > 59) {
    const hours = (duration - duration % 60) / 60;
    const minutes = duration % 60;
    return `${hours}ч ${minutes > 0 ? minutes + 'м' : ''}`
  }
  return `${duration}м`;
}
///////////////////////////////////////////////////////////////////////
  