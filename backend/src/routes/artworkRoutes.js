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
} from "../controllers/artworkController.js";

const router = express.Router();

// Buscar artes da home
router.get('/', getImage);

// Postar obra
router.post("/", authMiddleware, upload.single("image"), createArtwork);

// Info do artista
router.get("/biography", getBiographyOfArtist);

// Buscar uma obra pelo id
router.get("/:id", getArtworkById);
// Atualizar obra
router.put("/:id", authMiddleware, updateArtwork);
// Deletar obra
router.delete("/:id", authMiddleware, deleteArtwork);
// Logar o admin da plataforma






export default router;