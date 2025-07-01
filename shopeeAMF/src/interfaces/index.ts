export interface IProduct {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
  category: string;
  quantity?: number;
  status?: "toPay" | "toReceive" | "toReview";
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  cart?: IProduct[];
  address?: string;
  phone?: string;
}