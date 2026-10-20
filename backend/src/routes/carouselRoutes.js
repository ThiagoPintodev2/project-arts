import express from "express";
import { upload } from "../middleware/upload.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  postCarouselImage,
  getCarouselImage,
  updateCarouselImage,
  deleteCarouselImage,
} from "../controllers/artworkController.js";

const router = express.Router();

router.get('/', getCarouselImage);
router.post('/', authMiddleware, upload.single('image'), postCarouselImage);
router.put('/:id', authMiddleware, updateCarouselImage);
router.delete('/:id', authMiddleware, deleteCarouselImage);

export default router;