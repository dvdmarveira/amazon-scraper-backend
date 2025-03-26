import express from "express"; // Import the Express framework
import { scrapeProducts } from "../controllers/scrapeController.js"; // Import the scrapeProducts function from the controller

const router = express.Router(); // Create an instance of the Express router

// Define the route for scraping products, using the scrapeProducts controller
router.get("/scrape", scrapeProducts);

export default router; // Export the router to be used in the main server file
