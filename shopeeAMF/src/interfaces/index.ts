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
  _id: string;
  id?: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  cart?: IProduct[];
  address?: string;
  phone?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: any[];
  address: string;
  phone: string;
  email: string;
  shippingType: string;
  total: number;
  createdAt: string;
  status: "to_pay" | "to_receive" | "to_review" | "completed";
};