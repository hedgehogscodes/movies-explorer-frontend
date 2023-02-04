import { checkResponse } from "./utils";
import { OUTSIDE_URL } from "../config";

//////////////////Setup Movies ///////////////////////////////////////
export const getAllMovies = () => 
  fetch(`${OUTSIDE_URL}/beatfilm-movies`)
    .then(checkResponse);
/////////////////////////////////////////////////////////////////////