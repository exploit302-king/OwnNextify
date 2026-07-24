import schemaProduct from "../models/mproducts.js";
import { uploadToS3 } from "../config/config.js";
// import { uploadToS3 } from "../config/config.js";

// Fetch all Products
export const fetchProducts = async (req, res) => {
  try {
    // call the api
    const products = await schemaProduct.find({})
    if (products.length > 0) {
      res.json({
        ok: true,
        products
      })
    } else {
      res.json({
        ok: false,
        error: "No Product Found!"
      })
    }

  } catch (error) {
    res.json({
      ok: false,
      message: "Fetch Product not found " + error.message
    });
  }
}

// Fetch all Product by id (Single/Product Details page)
export const fetchProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await schemaProduct.findById(id);
    if (product) {
      res.json(product);
      console.log(product)
    } else {
      res.json({
        ok: false,
        error: `No Product Found With Provided id: ${id}`
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      message: "Fetch Product not found " + error.message
    });
  }
}

// Create a new Product
export const addNewProduct = async (req, res) => {
  try {

    const {
      title,
      subtitle,
      brand,
      category,
      description,
      price,
      stock,
    } = req.body;

    if (
      !title ||
      !subtitle ||
      !brand ||
      !category ||
      !description ||
      !price ||
      !stock
    ) {
      return res.json({
        ok: false,
        message: "All fields are required.",
      });
    }

    let image = [];

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      image.push(imageUrl);
    }

    const newProduct = await new schemaProduct({
      title,
      subtitle,
      brand,
      category,
      description,
      price,
      stock,
      image,
    }).save();

    res.json({
      ok: true,
      message: "Product Added Successfully!",
      newProduct,
    });

  } catch (error) {

    res.json({
      ok: false,
      message: error.message,
    });

  }
};

// Search AnyProduct
export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        ok: false,
        message: "Search keyword is required",
      });
    }

    const products = await schemaProduct.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { subtitle: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      ok: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// ================================
// Update Product
// PUT /api/v1/products/:id
// ================================

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      subtitle,
      brand,
      category,
      description,
      price,
      stock,
    } = req.body;

    const product = await schemaProduct.findById(id);

    if (!product) {
      return res.json({
        ok: false,
        message: "Product not found",
      });
    }

    // Update image only if new image uploaded
    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      product.image = [imageUrl];
    }

    product.title = title;
    product.subtitle = subtitle;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.stock = stock;

    await product.save();

    res.json({
      ok: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
};