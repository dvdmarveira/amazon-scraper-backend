import express from "express";
import cors from "cors";
import scrapeRoute from "./src/routes/scrapeRoute.js";

const app = express();
const port = 3000;

// CORS para todas as origens
app.use(cors());

// Configurar a rota de scraping
app.use("/api", scrapeRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
