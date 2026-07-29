import schemaOrder from "../models/order.js";
import schemaProduct from "../models/mproducts.js";

// Create Order
export const createOrder = async (req, res) => {
    try {

        const order = await schemaOrder.create(req.body);

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

        const order = await schemaOrder.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            ok: true,
            message: "Order updated successfully",
            order,
        });

    } catch (error) {

        res.json({
            ok: false,
            message: error.message,
        });

    }
};

// Delete Order
export const deleteOrder = async (req, res) => {
    try {

        await schemaOrder.findByIdAndDelete(req.params.id);

        res.json({
            ok: true,
            message: "Order deleted successfully",
        });

    } catch (error) {

        res.json({
            ok: false,
            message: error.message,
        });

    }
};