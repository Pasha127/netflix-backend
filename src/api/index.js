import express from "express";
import uniqid from "uniqid";
 import multer from "multer"; 
import createHttpError from "http-errors";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { pipeline } from "stream"
import { createGzip } from "zlib"