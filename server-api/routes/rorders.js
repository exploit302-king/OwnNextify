import express from "express";
import { requiredLoggedIn, requiredSellerOrAdmin, isAdmin, } from "../middlewares/authMiddleware.js";

import {
    createOrder,
    fetchMyOrders,
    fetchSellerOrders,
    fetchAllOrders,
    fetchSingleOrder,
    updateOrder,
    deleteOrder,
} from "../controllers/corders.js";

const orderRoute = express.Router();

// Create Order
orderRoute.post("/create-order", requiredLoggedIn, createOrder);

// Buyer Orders
orderRoute.get("/my-orders", requiredLoggedIn, fetchMyOrders);

// Seller Orders
orderRoute.get("/seller-orders", requiredLoggedIn, requiredSellerOrAdmin, fetchSellerOrders);

// Admin Orders
orderRoute.get("/allorders", requiredLoggedIn, isAdmin, fetchAllOrders);

// Get Single Order
orderRoute.get("/order/:id", requiredLoggedIn, fetchSingleOrder);

// Update Order
orderRoute.put("/update-order/:id", requiredLoggedIn, updateOrder);

// Delete Order
orderRoute.delete("/delete-order/:id", requiredLoggedIn, deleteOrder);

export default orderRoute;