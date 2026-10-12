import express from "express";
import { upload } from "../middleware/upload.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  postCarouselImage,
  getCarouselImage
} from "../controllers/artworkController.js";

const router = express.Router();

router.get('/', getCarouselImage);
router.post('/', authMiddleware, upload.single('image'), postCarouselImage);

export default router;