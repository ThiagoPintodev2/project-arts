import express from "express";
import { prisma } from "./src/db.js";

import artworkRoutes from "./src/routes/artworkRoutes.js";

const app = express();
app.use(express.json());

app.use("/", artworkRoutes);


app.listen(8081, () => {
  console.log("rodandoooooooo");
});
