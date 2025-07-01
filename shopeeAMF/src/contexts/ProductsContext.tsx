import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

import type { IProduct } from "../interfaces";

interface ProductsContextType {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  selectedProducts: string[];
  setSelectedProducts: (selectedProducts: string[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  cart: IProduct[];
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
  haveProductsToPay: boolean;
  haveProductsToReceive: boolean;
  haveProductsToReview: boolean;
}

// Contexto padrão (para evitar erro ao usar useContext sem Provider)
export const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

// 4. Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<IProduct[]>([]);

  const haveProductsToPay = products.some(
    (product) => product.status === "toPay"
  );

  const haveProductsToReceive = products.some(
    (product) => product.status === "toReceive"
  );

  const haveProductsToReview = products.some(
    (product) => product.status === "toReview"
  );

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductList();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        selectedProducts,
        setSelectedProducts,
        loading,
        setLoading,
        cart,
        setCart,
        haveProductsToPay,
        haveProductsToReceive,
        haveProductsToReview,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
