import express from "express";
import { getImages } from "../controller/images.controller.js";

const imagesRouter = express.Router();

imagesRouter.route("/").get(getImages);

export default imagesRouter;
