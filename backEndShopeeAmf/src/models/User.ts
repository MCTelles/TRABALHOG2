import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, default: null },
  address: { type: String, default: null },
});

const User = mongoose.model('User', userSchema);

export default User;