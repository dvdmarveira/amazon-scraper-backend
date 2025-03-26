## Amazon Scraper Backend

This is the backend of a project that allows the extraction of information about Amazon products from a provided keyword, using `bun init` with Bun version v1.2.6. [Bun](https://bun.sh) is a fast and complete JavaScript runtime.

## Features

- Accesses Amazon search results through a given keyword
- Extracts product title, rating, number of reviews, and image
- Returns data in JSON format
- Implements error handling for missing keywords and failed requests

## Technologies Used

- [Bun](https://bun.sh/) - Ultra-fast JavaScript runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [Axios](https://axios-http.com/) - HTTP client for requests
- [JSDOM](https://github.com/jsdom/jsdom) - Library for DOM manipulation on the server
- [CORS](https://www.npmjs.com/package/cors) - Middleware for cross-origin access control

## Backend Installation and Execution

### 1. Clone the backend repository

```sh
git clone https://github.com/dvdmarveira/amazon-scraper-backend.git
cd amazon-scraper-backend
```

### 2. Install dependencies

```sh
bun install
```

### 3. Run the server

```sh
bun run dev
```

The server will start at `http://localhost:3000`.

## Frontend Installation

### 1. Clone the frontend repository

```sh
git clone https://github.com/dvdmarveira/amazon-scraper-frontend.git
cd amazon-scraper-frontend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Access the interface

```
Open the index.html file in the project root
```

Ready! You can now use the application through the graphical interface. Or, if you prefer, use tools like Postman to test the endpoint directly.

**Note**: The frontend and backend must be running simultaneously for the application to work correctly. Make sure to follow the instructions for both repositories.

## Endpoints

### `GET /api/scrape?keyword=product`

This endpoint receives a `keyword` parameter to search for products on Amazon.

#### Parameters:

- `keyword` (string) - Keyword for the search.

#### Request example:

```sh
curl "http://localhost:3000/api/scrape?keyword=iphone"
```

#### Response:

```json
[
  {
    "title": "iPhone 13 Pro Max",
    "rating": "★ ★ ★ ★ ★ 4.8",
    "reviews": "12,345 reviews",
    "imageUrl": "https://m.media-amazon.com/images/I/xxxxx.jpg"
  }
]
```

## Project Structure

```
amazon-scraper-backend/
│-- node_modules/
│-- src/
│   ├── controllers/
│   │   ├── scrapeController.js
│   ├── routes/
│   │   ├── scrapeRoute.js
│-- .gitignore
│-- bun.lock
│-- package.json
│-- README.md
│-- server.js
```

## Error Handling

- Returns `400` if the keyword is not provided.
- Returns `404` if no products are found.
- Returns `500` in case of unexpected error.

## Final Considerations

- This project is for educational purposes only.
- Amazon scraping may be subject to restrictions and company policies. If it doesn't work with Bun, configure Node.
- It is recommended to use proxies to avoid blocks when making multiple requests.
- **CORS**: The CORS middleware is configured in the backend to allow the frontend, hosted on a different domain, to access the data without request blocking issues.
