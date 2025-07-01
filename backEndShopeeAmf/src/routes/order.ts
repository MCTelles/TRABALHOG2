// routes/orderRoutes.ts
import express from "express";
import { Order } from "../models/Orders.ts";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ message: "Pedido criado com sucesso!", order });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar pedido", error });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pedidos", error });
  }
});


export default router;
