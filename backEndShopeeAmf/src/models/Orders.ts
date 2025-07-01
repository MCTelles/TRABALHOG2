// models/Order.ts
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      productName: String,
      productImage: String,
      price: Number,
      quantity: Number,
    },
  ],
  address: String,
  phone: String,
  email: String,
  shippingType: { type: String, enum: ["standard", "express"], default: "standard" },
  total: Number,
  status: { type: String, enum: ["to_pay", "to_receive", "to_review", "completed"] },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
