import { checkResponse } from "./utils";
import { BASE_URL, OUTSIDE_URL } from "../config";

//////////////////register & authorize////////////////////////////////
export const register = (name, email, password) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password}),
  }).then(checkResponse);


export const authorize = (email, password) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
/////////////////////////////////////////////////////////////////////

//////////////////Setup User Info////////////////////////////////////
export const getUserInfo = () =>
  fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then(checkResponse);
/////////////////////////////////////////////////////////////////////

//////////////////Save User Info////////////////////////////////////
export const saveUserInfo = (name, email) => 
  fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
    }),
  }).then(checkResponse);
/////////////////////////////////////////////////////////////////////


//////////////////Save, Delete & Get User Movie/////////////////////
export const saveMovie = ({ country, director, duration, year, description, image, trailerLink,nameRU, nameEN, id }) =>
  fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: country || 'Данные отсутствуют',
      director: director || 'Данные отсутствуют',
      duration,
      year: year || 'Данные отсутствуют',
      description: description || 'Данные отсутствуют',
      image: OUTSIDE_URL + image.url,
      trailerLink: trailerLink || `http://movies.hedgehog.nomoredomains.club/error404`,
      nameRU: nameRU || 'Данные отсутствуют',
      nameEN: nameEN || 'Данные отсутствуют',
      thumbnail: OUTSIDE_URL + image.formats.thumbnail.url,
      movieId: id,
    }),
  }).then(checkResponse);


export const deleteMovie = (movieId) =>
  fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
  

export const getSavedMovies = () => 
  fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then(checkResponse);
/////////////////////////////////////////////////////////////////////