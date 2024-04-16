import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";

import imagesRouter from "./router/images.route.js";
import { rawImagesBucket } from "./config/aws.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello from server</h1>");
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use("/api/v1/images", upload.single("photo"), imagesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
