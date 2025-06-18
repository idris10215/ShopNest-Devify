import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: String,

    material: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 1,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
