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
  updateBiographyOfArtist,
  getSafiraCollectionImage,
  postSafiraCollectionImage,
  updateSafiraColletctionImage,
  deleteSafiraCollectionImage
} from "../controllers/artworkController.js";

const router = express.Router();

// Obras da Home
router.get('/', getImage);
router.post('/', authMiddleware, upload.single('image'), createArtwork);

// Biografia do artista
router.get('/biography', getBiographyOfArtist);
router.put('/biography/:id', authMiddleware, upload.single('image'), updateBiographyOfArtist);

// Coleção Safira
router.get('/safira-collection', getSafiraCollectionImage);
router.post('/safira-collection', authMiddleware, upload.single('image'), postSafiraCollectionImage);
router.put('/safira-collection/:id', authMiddleware, upload.single('image'), updateSafiraColletctionImage);
router.delete('/safira-collection/:id', authMiddleware, deleteSafiraCollectionImage);

// Obra específica da Home
router.get('/:id', getArtworkById);
router.put('/:id', authMiddleware, updateArtwork);
router.delete('/:id', authMiddleware, deleteArtwork);


export default router;