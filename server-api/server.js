import express from 'express';
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.AWS_ACCESS_KEY_ID);
// console.log(process.env.AWS_SECRET_ACCESS_KEY);
const app = express();

// DB connection
import dbConfig from './config/dbconfig.js';
dbConfig();

import * as config from './config/config.js';

const port = config.PORT || 9000;

// Import in Middleware
import morgan from 'morgan';
app.use(morgan("dev"));

import cors from 'cors';
app.use(cors());

// allow incoming json data
app.use(express.json());

// Multer setup for image upload
// import multer from 'multer';

// // Define storage location and filename format
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/'); // Save files in 'uploads' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Add timestamp to filename
//   }
// });

// const upload = multer({ storage: storage });

// // Test Route (upload image)
// app.post('/api/v1', upload.single('profileImage'), (req, res) => {
//   if (req.file) {
//     const imageUrl = '/uploads/' + req.file.filename;  // Correct path for image
//     res.json({ profileImageURL: imageUrl });
//   } else {
//     res.send('No file uploaded');
//   }
// });

// Another test Route
app.get('/api/v1', (req, res) => {
  res.send('API is running...');
});

// Routes import and pass in middleware
import rProducts from './routes/rproducts.js';
app.use("/api/v1/products", rProducts);

import authRoute from './routes/rusers.js';
app.use("/api/v1/users", authRoute);

// Start server
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}/api/v1`);
});
