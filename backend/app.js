import express from "express";
import { prisma } from "./src/db.js";
import { sendImage } from "./src/controllers/artworkController.js";
import artworkRoutes from "./src/routes/artworkRoutes.js";
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/", express.static("uploads"));
app.use("/", artworkRoutes);

app.listen(8081, () => {
  console.log("rodandoooooooo");
});
