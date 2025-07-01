import express, { Response, Request } from "express";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // mantendo o .js se estiver usando ESModules

const router = express.Router();

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/', upload.single("photo"), async (req: Request, res: Response) => {
  const { email, password, phone } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Este e-mail já está em uso." });
      return;
    }

    // 🔐 Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 👤 Criar o usuário com senha criptografada
    const newUser = new User({ email, password: hashedPassword, phone, photo });
    await newUser.save();

    // 🔐 Gerar o token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      user: {
        id: newUser._id,
        name: newUser.email.split("@")[0], // Usando o email para gerar um nome de usuário
        email: newUser.email,
        phone: newUser.phone,
        photo: newUser.photo
      }
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

export default router;
