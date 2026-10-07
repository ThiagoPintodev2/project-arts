import express from "express";
import { upload } from "../middleware/upload.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  createArtwork,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
  getBiographyOfArtist,
  getImage,
  updateBiographyOfArtist
} from "../controllers/artworkController.js";

const router = express.Router();

// Buscar artes da home
router.get('/', getImage);

// Postar obra
router.post("/", authMiddleware, upload.single("image"), createArtwork);

// Biografia do artista
router.get("/biography", getBiographyOfArtist);
//Alterar dados da Biografia do artista
router.put("/biography/:id", authMiddleware, upload.single("image"), updateBiographyOfArtist);


// Buscar uma obra pelo id
router.get("/:id", getArtworkById);
// Atualizar obra
router.put("/:id", authMiddleware, updateArtwork);
// Deletar obra
router.delete("/:id", authMiddleware, deleteArtwork);
// Logar o admin da plataforma






export default router;