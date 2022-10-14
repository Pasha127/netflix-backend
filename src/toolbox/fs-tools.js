import fs from "fs-extra";
import sgMail from "@sendgrid/mail"
import { join } from "path";

sgMail.setApiKey(process.env.SENDGRID_KEY)
const {readJSON, writeJSON} = fs;

/* const postersPublicFolderPath = join(process.cwd(), "/public/images/posters"); */
const moviesJSONPath = join(process.cwd(), "/src/data/movieData.json");
export const getMovies = () => readJSON(moviesJSONPath);
export const writeMovie = (moviesArr) => writeJSON(moviesJSONPath,moviesArr)

export const updateEntryPoster = async (id,path)=> {
    const moviesArray = await getMovies();
 const entryIndex = moviesArray.findIndex(movie => movie.imdbID === id);
 const oldMovie = moviesArray[entryIndex];    
 const updatedMovie = {...oldMovie, poster: path, updatedAt:new Date()}
 moviesArray[entryIndex] = updatedMovie;
 await writeMovie(moviesArray);
}