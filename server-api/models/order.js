import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

    {

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },

                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        shippingAddress: {
            type: String,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: [
                "Cash on Delivery",
                "Credit Card",
                "Website Wallet",
                "Bank Transfer",
            ],
            default: "Cash on Delivery",
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending",
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Processing",
                "Packed",
                "Shipped",
                "Out for Delivery",
                "Delivered",
                "Cancelled",
                "Returned",
                "Refunded",
            ],
            default: "Pending",
        },

        totalAmount: {
            type: Number,
            required: true,
        },
        shippingCharges: {
            type: Number,
            default: 0,
        },

        taxAmount: {
            type: Number,
            default: 0,
        },

        discountAmount: {
            type: Number,
            default: 0,
        },

        trackingNumber: {
            type: String,
            default: "",
        },

        estimatedDelivery: {
            type: Date,
        },

        deliveredAt: {
            type: Date,
        },

        notes: {
            type: String,
            default: "",
        },

    },

    {
        timestamps: true,
    }

);

export default mongoose.model("Order", orderSchema);