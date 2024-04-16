import express from "express";
import {
  deleteImage,
  getImages,
  uploadImages,
} from "../controller/images.controller.js";

const imagesRouter = express.Router();

imagesRouter.route("/").get(getImages).post(uploadImages);
imagesRouter.route("/:id").delete(deleteImage);

export default imagesRouter;
