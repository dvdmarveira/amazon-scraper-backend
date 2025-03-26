import express from "express"; // Import the Express framework
import cors from "cors"; // Import the CORS middleware to control access
import scrapeRoute from "./src/routes/scrapeRoute.js"; // Import the scraping route

const app = express(); // Create an instance of the Express app
const port = 3000; // Define the server port

// CORS to allow all origins
app.use(cors()); // Middleware that allows the frontend to access the API without origin restrictions

// Main scraping route
app.use("/api", scrapeRoute); // Set up the /api route to use the routes defined in scrapeRoute

// Start the server on the defined port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Display message in the console when the server is running
});
