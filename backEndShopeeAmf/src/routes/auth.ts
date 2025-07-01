import express, { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Tentativa de login com email:", email);

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      console.log("Usuário não encontrado");
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      console.log("Senha incorreta para o usuário:", email);
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    console.log("Login bem-sucedido para o usuário:", email);
    return res.json({
      message: "Login bem-sucedido",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.email.split("@")[0], // Usando o email para gerar um nome de usuário 
        phone: user.phone,
        photo: user.photo,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

const authenticate = (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token ausente" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default router;