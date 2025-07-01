import { useNavigate, useParams } from "react-router-dom";
import styles from "./BuyProduct.module.scss";
import { useProducts } from "../../hooks/useProducts";

function BuyProduct() {
  const { id } = useParams();
  const { products, setCart } = useProducts();
  const product = products.find((product) => product._id === String(id));
  const navigate = useNavigate();

  const addToCart = () => {
    if (product) {
      setCart((prev) => {
        const existingProduct = prev.find((item) => item._id === product._id);
        if (existingProduct) {
          return prev.map((item) =>
            item._id === product._id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        } else {
          return [...prev, { ...product, quantity: 1 }];
        }
      });
      navigate("/cart");
    }
  };

  return (
    <div className={styles.buyProductContainer}>
      <img src={product?.productImage} alt="" />
      <div className={styles.buyContainer}>
        <div className={styles.productDescription}>
          <span>{product?.productName}</span>
          <h2>${product?.price}</h2>
        </div>
        <button onClick={addToCart}>Buy</button>
      </div>
    </div>
  );
}

export { BuyProduct };
