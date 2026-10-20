import "dotenv/config";
import express from "express";
import artworkRoutes from "./src/routes/artworkRoutes.js";
import authRoutes from '../backend/src/routes/authRoutes.js';
import carouselRoutes from '../backend/src/routes/carouselRoutes.js'
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/artworks', artworkRoutes);
app.use('/carousel', carouselRoutes);
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

app.listen(8081, () => {
  console.log("rodandoooooooo");
});
