import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";

const addProduct = async (req, res) => {
  try {
    const { name, price, description, material, size, color, stock } = req.body;
    const file = req.file;

    if (!name || !price || !material || !size || !color || !stock || !file) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    const newProduct = new Product({
      name,
      price,
      description,
      material,
      size,
      color,
      stock,
      imageUrl: result.secure_url,
      createdBy: req.user._id,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); 
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
  }
};

export { addProduct, getProducts };
