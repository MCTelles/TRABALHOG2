import express, { Request, Response } from "express";
import User from "../models/User.js";

const router = express.Router();

router.put("/address/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { address } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json({ message: "Endereço atualizado", user: updatedUser });
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

export default router;