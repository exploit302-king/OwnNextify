import express from "express";
import { upload } from "../config/config.js";


const prodRoute = express.Router();

// Import Controllers
import * as prod from "../controllers/cproducts.js";

// Add Product
prodRoute.post("/", upload.single("productImage"), prod.addNewProduct);

// Get All Products
prodRoute.get("/", prod.fetchProducts);

// Search Products
prodRoute.get("/search", prod.searchProducts);

// Update Product
prodRoute.put("/:id", upload.single("image"), prod.updateProduct);

// Get Single Product
prodRoute.get("/:id", prod.fetchProduct);

export default prodRoute;