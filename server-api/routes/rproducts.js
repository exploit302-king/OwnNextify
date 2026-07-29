import express from "express";
import { upload } from "../config/config.js";
import {
    requiredLoggedIn,
    requiredSellerOrAdmin,
} from "../middlewares/authMiddleware.js";


const prodRoute = express.Router();

// Import Controllers
import * as prod from "../controllers/cproducts.js";

// Add Product
prodRoute.post("/", requiredLoggedIn, requiredSellerOrAdmin, upload.single("productImage"), prod.addNewProduct);

// Get All Products
prodRoute.get("/", prod.fetchProducts);

// Seller Products
prodRoute.get("/my-products", requiredLoggedIn, requiredSellerOrAdmin, prod.fetchSellerProducts);

// Search Products
prodRoute.get("/search", prod.searchProducts);

// Update Product
prodRoute.put("/:id", requiredLoggedIn, requiredSellerOrAdmin, upload.single("image"), prod.updateProduct);

// Get Single Product
prodRoute.get("/:id", prod.fetchProduct);

// Delete Product
prodRoute.delete("/:id", requiredLoggedIn, requiredSellerOrAdmin, prod.deleteProduct);

export default prodRoute;