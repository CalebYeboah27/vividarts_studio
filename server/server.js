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

const PORT = 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

// Middleware to inject the instance IP address into response locals
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.locals.instanceIp = ip;
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Hello from server</h1>");
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/api/v1/ip', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>EC2 Instance IP Example</title>
      </head>
      <body>
        <h1>EC2 Instance IP:</h1>
        <p id="instanceIp">${res.locals.instanceIp}</p>
        <script>
          // Access the instance IP address from JavaScript
          const instanceIp = document.getElementById('instanceIp').textContent;
          console.log('EC2 Instance IP:', instanceIp);
          // Use the IP address as needed in your client-side JavaScript code
        </script>
      </body>
    </html>
  `);
});

app.use("/api/v1/images", upload.single("photo"), imagesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
