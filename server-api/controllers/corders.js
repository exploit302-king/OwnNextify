import schemaOrder from "../models/order.js";
import schemaProduct from "../models/mproducts.js";
import mongoose from "mongoose";

// Create Order
export const createOrder = async (req, res) => {
    try {

        const { products } = req.body;

        // 1. Stock Check
        for (const item of products) {

            const product = await schemaProduct.findById(item.product);

            if (!product) {
                return res.json({
                    ok: false,
                    message: "Product not found.",
                });
            }

            if (product.stock < item.quantity) {
                return res.json({
                    ok: false,
                    message: `${product.title} has only ${product.stock} item(s) left in stock.`,
                });
            }
        }

        // 2. Create Order
        const order = await schemaOrder.create(req.body);

        // 3. Reduce Stock
        for (const item of products) {

            await schemaProduct.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }

        res.json({
            ok: true,
            message: "Order created successfully",
            order,
        });

    } catch (error) {

        res.json({
            ok: false,
            message: error.message,
        });

    }
};

// Get My Orders
export const fetchMyOrders = async (req, res) => {
    try {

        console.log("req.user:", req.user);

        const orders = await schemaOrder.find({
            customer: req.user.id,
        });

        console.log("Orders:", orders);

        res.json({
            ok: true,
            orders,
        });

    } catch (error) {

        console.log(error);

        res.json({
            ok: false,
            message: error.message,
        });

    }
};

// Get All Orders
export const fetchAllOrders = async (req, res) => {
    try {

        const orders = await schemaOrder
            .find({})
            .populate("customer", "name email profileImage")
            .populate("products.product");

        console.log("Total Orders:", orders.length);

        res.json({
            ok: true,
            orders,
        });

    } catch (error) {

        res.json({
            ok: false,
            message: error.message,
        });

    }
};

// Get Seller Orders
export const fetchSellerOrders = async (req, res) => {
    try {

        // Seller ke products
        const products = await schemaProduct.find({
            seller: req.user.id,
        });

        const productIds = products.map((product) => product._id);

        // Sirf un orders ko lao jin me seller ke products hain
        const orders = await schemaOrder
            .find({
                "products.product": { $in: productIds },
            })
            .populate("customer", "name email profileImage")
            .populate("products.product");

        res.json({
            ok: true,
            orders,
        });

    } catch (error) {

        res.json({
            ok: false,
            message: error.message,
        });

    }
};

// Get Single Order
export const fetchSingleOrder = async (req, res) => {
    try {

        const order = await schemaOrder
            .findById(req.params.id)
            .populate("customer", "name email phone address profileImage")
            .populate("products.product");

        res.json({
            ok: true,
            order,
        });

    } catch (error) {

        res.json({
            ok: false,
            message: error.message,
        });

    }
};

// Update Order
export const updateOrder = async (req, res) => {
    try {

        // Old Order
        const oldOrder = await schemaOrder.findById(req.params.id);

        if (!oldOrder) {
            return res.json({
                ok: false,
                message: "Order not found",
            });
        }

        // ==========================================
        // STEP 1
        // Old Products Stock Restore
        // ==========================================

        for (const item of oldOrder.products) {

            await schemaProduct.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: item.quantity,
                    },
                }
            );
            const p = await schemaProduct.findById(item.product);
            console.log("Stock After Restore:", p.stock);

        }

        // ==========================================
        // STEP 2
        // Check New Stock
        // ==========================================

        for (const item of req.body.products) {

            const product = await schemaProduct.findById(item.product._id);

            if (!product) {

                return res.json({
                    ok: false,
                    message: "Product not found",
                });

            }

            if (product.stock < item.quantity) {

                return res.json({
                    ok: false,
                    message: `${product.title} has only ${product.stock} item(s) left.`,
                });

            }

        }

        // ==========================================
        // STEP 3
        // Deduct New Stock
        // ==========================================

        for (const item of req.body.products) {

            await schemaProduct.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );

        }

        // ==========================================
        // STEP 4
        // Update Order
        // ==========================================

        const updatedOrder = await schemaOrder.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        )
            .populate("customer")
            .populate("products.product");

        res.json({
            ok: true,
            message: "Order Updated Successfully",
            order: updatedOrder,
        });

    }
    catch (error) {

        console.log(error);

        res.json({
            ok: false,
            message: error.message,
        });

    }
};

// Delete Order
export const deleteOrder = async (req, res) => {

    try {

        const order = await schemaOrder.findById(req.params.id);
        if (
            order.orderStatus === "Delivered" ||
            order.paymentStatus === "Paid"
        ) {
            return res.json({
                ok: false,
                message: "Delivered or Paid orders cannot be deleted.",
            });
        }
        if (!order) {
            return res.json({
                ok: false,
                message: "Order not found",
            });
        }

        // Restore Stock

        for (const item of order.products) {

            await schemaProduct.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: item.quantity,
                    },
                }
            );

        }

        await schemaOrder.findByIdAndDelete(req.params.id);

        res.json({
            ok: true,
            message: "Order Deleted Successfully",
        });

    } catch (error) {

        console.log(error);

        res.json({
            ok: false,
            message: error.message,
        });

    }

};