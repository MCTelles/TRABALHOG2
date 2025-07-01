import express from "express";
import Product from "../models/Product.js"; // se usar .ts mude a extensão conforme necessário

const router = express.Router();

// Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

// Adicionar múltiplos produtos
router.post("/seed", async (req, res) => {
  try {
    console.log("Produtos a inserir:", req.body);
    await Product.deleteMany({});
    await Product.insertMany(req.body);
    res.status(201).json({ message: "Produtos inseridos com sucesso" });
  } catch (err) {
    console.error("Erro ao inserir produtos:", err);
    res.status(500).json({ message: "Erro ao inserir produtos" });
  }
});


export default router;
