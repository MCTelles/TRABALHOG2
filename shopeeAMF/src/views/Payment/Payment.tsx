import styles from "./Payment.module.scss";

function Payment() {
  return (
    <div className={styles.paymentContainer}>
      <h1>Payment</h1>

      <div className={styles.shippingAddress}></div>
      <div className={styles.contactInformation}></div>

    </div>
  );
}

export { Payment };
