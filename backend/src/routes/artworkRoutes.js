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
  login,
  teste
} from "../controllers/artworkController.js";


const router = express.Router();
router.get("/teste", authMiddleware, teste);

// buscar dados do carousel
//router.get('/', getDatasOfHeroSlide);

// Buscar artes da home
router.get('/', getImage);

// Criar obra
router.post("/", upload.single("image"), createArtwork);;

// Info do artista
router.get("/biography", getBiographyOfArtist);

// Buscar uma obra pelo id
router.get("/:id", getArtworkById);
// Atualizar obra
router.put("/:id", updateArtwork);
// Deletar obra
router.delete("/:id", deleteArtwork);
// Logar o admin da plataforma
router.post("/admin-area", login);






export default router;