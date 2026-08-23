import express from "express";
import {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
  getBiographyOfArtist
} from "../controllers/artworkController.js";

const router = express.Router();

// Criar obra
router.post("/", createArtwork);
// Listar obras
router.get("/", getArtworks);
// Info do artista
router.get("/biography", getBiographyOfArtist);
// Buscar uma obra pelo id
router.get("/:id", getArtworkById);
// Atualizar obra
router.put("/:id", updateArtwork);
// Deletar obra
router.delete("/:id", deleteArtwork);


export default router;