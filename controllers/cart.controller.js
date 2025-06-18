import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;
  const qty = Number(quantity) || 1;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (qty > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items left in stock`,
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: qty }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += qty;
      } else {
        cart.items.push({ product: productId, quantity: qty });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
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
    res
      .status(500)
      .json({ message: "Failed to load cart", error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const qty = Number(req.body.quantity) || 1;

  try {
    if (qty < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (qty > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available for update`,
      });
    }

    item.quantity = qty;

    await cart.save();
    res.status(200).json({ message: "Quantity updated", cart });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const removeCartItem = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed from the cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export { addToCart, getCart, updateCartItem, removeCartItem };
