import "dotenv/config";
import express from "express";
import artworkRoutes from "./src/routes/artworkRoutes.js";
import authRoutes from '../backend/src/routes/authRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/", artworkRoutes);
app.use('/auth', authRoutes);

app.listen(8081, () => {
  console.log("rodandoooooooo");
});
