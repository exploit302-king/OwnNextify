import express from "express";

const prodRoute = express.Router();

// Import Controllers
import * as prod from "../controllers/cproducts.js";

// Add Product
prodRoute.post("/", prod.addNewProduct);

// Get All Products
prodRoute.get("/", prod.fetchProducts);

// Search Products
prodRoute.get("/search", prod.searchProducts);

// Get Single Product
prodRoute.get("/:id", prod.fetchProduct);

export default prodRoute;