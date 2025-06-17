import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });

  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ message: "Your cart is empty", items: [] });
    }

    res.status(200).json({
      items: cart.items.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        price: item.product.price,
        quantity: item.quantity,
        totalPrice: item.quantity * item.product.price,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load cart", error: err.message });
  }
};

export { addToCart, getCart };