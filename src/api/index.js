import express from "express";
import uniqid from "uniqid";
 import multer from "multer"; 
import createHttpError from "http-errors";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { getMovies, writeMovie } from "../toolbox/fs-tools";
import { checkMovieSchema, checkValidationResult } from "./validator.js"

const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
      cloudinary, 
      params: {folder: "Netflix"},
    }),
    limits: { fileSize: 1024 * 1024 },
  }).single("image")

const moviesRouter = express.Router();

moviesRouter.get("/", async (req,res,next)=>{
    try{
        console.log(req.headers.origin, "GET posts at:", new Date());
        const moviesArr = await getMovies();
        res.status(200).send(moviesArr)        
    }catch(error){ 
        next(error)
    }    
})


moviesRouter.get("/:movieId" , async (req,res,next)=>{
    try{
        console.log(req.headers.origin, "GET post at:", new Date());
        const movieId = req.params.movieId;
        const moviesArray = await getMovies();
        const foundMovie = moviesArray.find(movie =>movie.imdbID === movieId)        
        if(foundMovie){
            res.status(200).send(foundMovie);
        }else{next(createHttpError(404, "Movie Not Found"));
    } 
    }catch(error){
        next(error);
    }
})

moviesRouter.post("/", checkMovieSchema, checkValidationResult, async (req,res,next)=>{
    try{
        console.log(req.headers.origin, "POST post at:", new Date());
        const newMovie = {...req.body, createdAt:new Date(), imdbID:uniqid()};
        const moviesArray = await getMovies();  
       moviesArray.push(newMovie);
        await writeMovie(moviesArray);        
        res.status(201).send({message:`Added a new movie.`,imdbID:newMovie.imdbID});
        
    }catch(error){
        next(error)
    }
})