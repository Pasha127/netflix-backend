import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"

const blogSchema = {  
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title is a mandatory field and needs to be a string!",
    },
  },
  year: {
    in: ["body"],
    isString: {
      errorMessage: "Year is a mandatory field and needs to be a string!",
    },
  },
  imdbID: {
    in: ["body"],
    isString: {
      errorMessage: "imdbID is a mandatory field and needs to be a string!",
    },
  },
  type: {
    in: ["body"],
    isString: {
      errorMessage: "Type is a mandatory field and needs to be a string!",
    },
  },
  poster: {
    in: ["body"],
    isString: {
      errorMessage: "Poster is a mandatory field and needs to be a URL string!",
    },
  } 
  
}



export const checkMovieSchema = checkSchema(movieSchema) 
export const checkValidationResult = (req, res, next) => { 
  const errors = validationResult(req)
  if (!errors.isEmpty()) {   
    next(
      createHttpError(400, "Validation errors in request body!", {
        errorsList: errors.array(),
      })
    );
    console.log("400 in validator", errors);
  } else {
    next()
  }
}