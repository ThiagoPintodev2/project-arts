import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
  getBiographyOfArtist,
  getDatasOfHeroSlide,
  sendImage
} from "../controllers/artworkController.js";

const router = express.Router();

// buscar dados do carousel
router.get('/', getDatasOfHeroSlide);
// Criar obra
router.post("/", createArtwork);
// Info do artista
router.get("/biography", getBiographyOfArtist);
// enviar imagem
router.post("/upload", upload.single("image"), sendImage);
// Buscar uma obra pelo id
router.get("/:id", getArtworkById);
// Atualizar obra
router.put("/:id", updateArtwork);
// Deletar obra
router.delete("/:id", deleteArtwork);

export default router;