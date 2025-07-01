import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ["toPay", "toReceive", "toReview"], required: false }, 
});

export default mongoose.model("Product", productSchema);
