import schemaProduct from "../models/mproducts.js";



// Fetch all Products
export const fetchProducts = async(req, res) =>{
  try {
    // call the api
    const products = await schemaProduct.find({})
    if(products.length > 0){
      res.json({
        ok: true,
        products
      })
    }else{
      res.json({
        ok: false,
        error: "No Product Found!"
      })
    }

  } catch (error) {
    res.json({
      ok:false,
      message:"Fetch Product not found " + error.message
    });
  }
}

// Fetch all Product by id (Single/Product Details page)
export const fetchProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await schemaProduct.findById(id);
    if (product) {
      res.json( product );
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
      // Destructure product fields from request body
      const { title, subtitle, brand, category, description, price, image, stock } = req.body;
    
      // Validate required fields
      if (!title || !subtitle || !brand || !category || !description || !price || !image || !stock) {
        return res.send({
          ok: false,
          message: "All fields are required to add a new product.",
        });
      }
    
      try {
        // Create and save new product in MongoDB
        const newProduct = await new schemaProduct({
          title, subtitle, brand, category, description, price, image, stock,
        }).save();
    
        // Respond with success message and created product
        res.send({
          ok: true,
          message: "New Product inserted successfully into MongoDB cloud!",
          newProduct,
        });
      } catch (error) {
        // Handle errors and log for debugging
        res.send({
          ok: false,
          message: "Failed to add new product. " + error.message,

        });
        console.error("Something went wrong: " + error.message);
        console.log("Request Body:", req.body);

      }
    };
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
    