import styles from "./Card.module.scss";

interface ITypeProducts {
  productName: string;
  productPrice: number;
  productImage: string;
}

function Card({ productName, productPrice, productImage }: ITypeProducts) {
  return (
    <>
      <div className={styles.cardContainer}>
        <img src={productImage} alt="" />

        <div className={styles.cardContent}>
          <span className={styles.cardTitle}>{productName}</span>
          <h2>${productPrice}</h2>
        </div>
      </div>
    </>
  );
}

export { Card };
