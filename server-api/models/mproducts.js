import mongoose from "mongoose";

const { model, Schema, ObjectId } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  image: [{

  }],

  stock: {
    type: Number,
    default: 0,
  },
  review: [],
  numOfReviews: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    rating: 1,
  },
  // user: {
  //   type: ObjectId,
  //   ref: "User",
  //   required: true,
  //   default: () => new mongoose.Types.userId(),
  // },
  onSale: {
    type: Boolean,
    default: false,
  },
  isProductNew: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  resetPasswordCode : { }

}, { timestamps: true });

const schemaProduct = model("Product", productSchema);

export default schemaProduct;
