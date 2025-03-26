import axios from "axios"; // Import the Axios HTTP client for making requests
import { JSDOM } from "jsdom"; // Import JSDOM for parsing and interacting with the HTML document

// Function to scrape products based on a search keyword
export const scrapeProducts = async (req, res) => {
  const keyword = req.query.keyword; // Get the 'keyword' query parameter from the request

  // Check if the keyword is provided and not empty
  if (!keyword || keyword.trim() === "") {
    return res
      .status(400)
      .json({ error: "Keyword is required and cannot be empty" });
  }

  try {
    // Construct the URL for Amazon search with the keyword
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    // Make the GET request to Amazon
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", // User-Agent header to mimic a real browser
        "Accept-Language": "en-US,en;q=0.9", // Accept Language header for content localization
        "Accept-Encoding": "gzip, deflate, br", // Accept Encoding header to allow compression
        Connection: "keep-alive", // Connection header to keep the connection open
      },
    });

    const html = response.data; // Extract the HTML content from the response

    const dom = new JSDOM(html); // Create a new JSDOM instance with the HTML
    const document = dom.window.document; // Access the document object

    // Select all product listings from the page
    const productListings = document.querySelectorAll(
      ".s-main-slot .s-result-item"
    );

    // Map over the product listings to extract relevant information
    const products = Array.from(productListings).map((item) => {
      const title = item.querySelector("h2 span")?.textContent || null; // Get the product title
      const ratingText =
        item.querySelector(".a-icon-alt")?.textContent || "No rating"; // Get the product rating text
      const rating = ratingText.match(/(\d+\.\d+)/)?.[0] || "No rating"; // Extract only the numeric rating

      // Calculate stars based on rating
      const ratingValue = parseFloat(rating) || 0;
      const totalStars = 5;
      let filledStars = Math.floor(ratingValue); // Fully filled stars
      let halfStar = ratingValue % 1 >= 0.5 ? 1 : 0; // Check if a half-star should be displayed
      let emptyStars = totalStars - filledStars - halfStar; // Calculate empty stars

      // Generate the visual representation of stars
      const stars = [
        ...Array(filledStars).fill("★"), // Full stars
        ...Array(halfStar).fill("⯪"), // Half-filled star
        ...Array(emptyStars).fill("☆"), // Empty stars
      ];

      const reviewsText =
        item.querySelector(".a-size-base")?.textContent || "No reviews"; // Get the number of reviews
      const reviews = Number(
        reviewsText.replace(/[^0-9]/g, "") || "0"
      ).toLocaleString("en-US"); // Format the review count with commas

      const imageUrl = item.querySelector(".s-image")?.src || null; // Get the product image URL

      if (!title || !imageUrl) {
        return null; // If there's no title or image, skip this product
      }

      // Return the product details in an object
      return {
        title,
        rating: `${stars.join(" ")} ${rating}`, // Combine the stars and rating value
        reviews: `${reviews} reviews`, // Format the reviews text
        imageUrl, // Include the image URL
      };
    });

    // If no products were found, return a 404 response
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given keyword" });
    }

    // Return the list of products as JSON, excluding any null items
    res.json(products.filter((item) => item !== null));
  } catch (error) {
    // If there's an error during scraping, log it and return a 500 response
    console.error("Error during scraping:", error.message || error);
    res
      .status(500)
      .json({ error: `Failed to scrape data: ${error.message || error}` });
  }
};
