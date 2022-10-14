import fs from "fs-extra";
import sgMail from "@sendgrid/mail"
import { join } from "path";

sgMail.setApiKey(process.env.SENDGRID_KEY)
const {readJSON, writeJSON} = fs;

const moviesJSONPath = join(process.cwd(), "/src/data/movieData.json");
export const getMovies = () => readJSON(moviesJSONPath);
export const writeMovie = (moviesArr) => writeJSON(moviesJSONPath,moviesArr)