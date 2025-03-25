import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";
import cors from "cors";

const app = express();
const port = 3000;

// CORS para todas as origens
app.use(cors());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
