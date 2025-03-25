import express from "express";
import { scrapeProducts } from "../controllers/scrapeController.js";

const router = express.Router();

// Rota para fazer o scraping dos produtos
router.get("/scrape", scrapeProducts);

export default router;
