import { useProducts } from "../../hooks/useProducts";
import { useUser } from "../../hooks/useUser";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import styles from "./Profile.module.scss";

import product1 from "/images/product1.jpg";
import product2 from "/images/product2.jpg";
import product3 from "/images/product3.jpg";
import product4 from "/images/product4.jpg";
import product5 from "/images/product5.jpg";
import product6 from "/images/product6.jpg";
import product7 from "/images/product7.jpg";
// import product8 from "/images/product.jpg";
// import product9 from "/images/product.jpg";
// import product10 from "/images/product.jpg";
// import product11 from "/images/product.jpg";
// import product12 from "/images/product.jpg";
// import product13 from "/images/product.jpg";
// import product14 from "/images/product.jpg";
// import product15 from "/images/product.jpg";

function Profile() {
  const { haveProductsToPay, haveProductsToReceive, haveProductsToReview } =
    useProducts();

  const { user } = useUser();

  const images = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
  ];

  return (
    <div className={styles.profileContainer}>
      <div className={styles.greetingsContainer}>
        <h2>Hello, {user.name}!</h2>

        <img
          className={styles.profileImage}
          src={`http://localhost:5000/uploads/${user.photo}`}
          alt="Foto do perfil"
        />
      </div>

      <div className={styles.ordersContainer}>
        <h2>My Orders</h2>

        <div className={styles.statusButtonsOrder}>
          <button className={haveProductsToPay ? styles.hasBadge : ""}>
            To pay
          </button>

          <button className={haveProductsToReceive ? styles.hasBadge : ""}>
            To receive
          </button>

          <button className={haveProductsToReview ? styles.hasBadge : ""}>
            To review
          </button>
        </div>
      </div>

      <div className={styles.shopContainer}>
        <h2>Shop</h2>

        <ImageCarousel images={images} />
      </div>
    </div>
  );
}

export { Profile };
