// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import register from "./routes/register.ts";
import authRoutes from "./routes/auth.ts";
import productRoutes from "./routes/products.ts";
import userRoutes from "./routes/user.ts";
import ordersRoutes from "./routes/order.ts";


dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/register', register);
app.use('/auth', authRoutes);
app.use("/products", productRoutes);
app.use('/user', userRoutes);
app.use('/orders', ordersRoutes);
app.use("/uploads", express.static("uploads")); // servir imagens

// Verifica se a MONGO_URI está presente
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Variável de ambiente MONGO_URI não está definida.");
  process.exit(1); // Encerra o processo
}

// Rota inicial
app.get('/', (req, res) => {
  res.send('Olá do backend Node.js com TypeScript!');
});

// Conexão com MongoDB + Início do servidor
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar no MongoDB:', error);
  });
