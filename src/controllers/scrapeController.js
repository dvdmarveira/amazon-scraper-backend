import axios from "axios";
import { JSDOM } from "jsdom";

export const scrapeProducts = async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword || keyword.trim() === "") {
    return res
      .status(400)
      .json({ error: "Keyword is required and cannot be empty" });
  }

  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    });
    const html = response.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const productListings = document.querySelectorAll(
      ".s-main-slot .s-result-item"
    );

    const products = Array.from(productListings).map((item) => {
      const title = item.querySelector("h2 span")?.textContent || null;
      const ratingText =
        item.querySelector(".a-icon-alt")?.textContent || "No rating";
      const rating = ratingText.match(/(\d+\.\d+)/)?.[0] || "No rating"; // Extração de apenas a nota numérica

      // Calcular as estrelas com base na avaliação (rating)
      const ratingValue = parseFloat(rating) || 0;
      const totalStars = 5;
      let filledStars = Math.floor(ratingValue); // Estrelas completamente preenchidas
      let halfStar = ratingValue % 1 >= 0.5 ? 1 : 0; // Verificar se a estrela parcial deve ser exibida
      let emptyStars = totalStars - filledStars - halfStar; // Estrelas vazias

      // Gerar a representação visual das estrelas
      const stars = [
        ...Array(filledStars).fill("★"), // Estrelas cheias
        ...Array(halfStar).fill("⯪"), // Estrela meio preenchida
        ...Array(emptyStars).fill("☆"), // Estrelas vazias
      ];

      const reviewsText =
        item.querySelector(".a-size-base")?.textContent || "No reviews";
      const reviews = Number(
        reviewsText.replace(/[^0-9]/g, "") || "0"
      ).toLocaleString("en-US");

      const imageUrl = item.querySelector(".s-image")?.src || null;

      if (!title || !imageUrl) {
        return null;
      }

      return {
        title,
        rating: `${stars.join(" ")} ${rating}`, // Colocando as estrelas e a nota ao lado
        reviews: `${reviews} reviews`,
        imageUrl,
      };
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given keyword" });
    }

    res.json(products.filter((item) => item !== null));
  } catch (error) {
    console.error("Error during scraping:", error.message || error);
    res
      .status(500)
      .json({ error: `Failed to scrape data: ${error.message || error}` });
  }
};
