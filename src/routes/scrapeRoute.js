import express from "express";
import { scrapeProducts } from "../controllers/scrapeController.js";

const router = express.Router();

router.get("/scrape", scrapeProducts);

export default router;
