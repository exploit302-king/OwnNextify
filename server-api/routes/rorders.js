import express from "express";
import { requiredLoggedIn } from "../middlewares/authMiddleware.js";

import {
  createOrder,
  fetchOrders,
  fetchSingleOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/corders.js";

const orderRoute = express.Router();

// Create Order
orderRoute.post("/create-order", requiredLoggedIn, createOrder);

// Get All Orders
orderRoute.get("/allorders", requiredLoggedIn, fetchOrders);

// Get Single Order
orderRoute.get("/order/:id", requiredLoggedIn, fetchSingleOrder);

// Update Order
orderRoute.put("/update-order/:id", requiredLoggedIn, updateOrder);

// Delete Order
orderRoute.delete("/delete-order/:id", requiredLoggedIn, deleteOrder);

export default orderRoute;