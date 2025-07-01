import { useState } from "react";
import { useNavigate } from "react-router";
import { useProducts } from "../../hooks/useProducts";
import { useUser } from "../../hooks/useUser";

import editButtonIcon from "../../assets/editButton.png";
import styles from "./Payment.module.scss";

function Payment() {
  const { cart } = useProducts();
  const { user } = useUser();

  console.log("Usuário logado na Payment:", user);

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const orderPayload = {
        userId: user.id,
        items: cart.map((item) => ({
          productId: item._id,
          productName: item.productName,
          productImage: item.productImage,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        address: user.address,
        phone: user.phone,
        email: user.email,
        shippingType: selectedShipping,
        total,
      };

      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Pedido realizado com sucesso!");
        navigate("/profile"); // ou a página que você criar
      } else {
        alert(data.message || "Erro ao realizar pedido");
      }
    } catch (err) {
      console.error("Erro ao enviar pedido:", err);
      alert("Erro ao processar pagamento");
    }
  };

  const [selectedShipping, setSelectedShipping] = useState<
    "standard" | "express"
  >("standard");

  const basePrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const expressPrice = 12;

  const total =
    selectedShipping === "express" ? basePrice + expressPrice : basePrice;

  return (
    <div className={styles.paymentContainer}>
      <h1 className={styles.paymentTitle}>Payment</h1>

      {/* Endereço */}
      <div className={styles.shippingBox}>
        <h2 className={styles.shippingLabel}>Shipping Address</h2>
        <p>{user.address || "Seu endereço aqui"}</p>
        <button className={styles.editButton}>
          <img src={editButtonIcon} alt="Edit Address" />
        </button>
      </div>

      {/* Contato */}
      <div className={styles.shippingBox}>
        <h2 className={styles.shippingLabel}>Contact Information</h2>
        <p>{user.phone || "+55 (xx) xxxxx-xxxx"}</p>
        <p>{user.email || "email@example.com"}</p>
        <button className={styles.editButton}>
          <img src={editButtonIcon} alt="Edit Contact" />
        </button>
      </div>

      {/* Itens */}
      <div>
        <h2 className={styles.sectionTitle}>
          Items <span className={styles.badge}>{cart.length}</span>
        </h2>

        {cart.map((item) => (
          <div key={item._id} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <div className={styles.imageWrapper}>
                <img src={item.productImage} alt={item.productName} />
                <span className={styles.itemQty}>{item.quantity || 1}</span>
              </div>
              <p>{item.productName}</p>
            </div>
            <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Opções de frete */}
      <div className={styles.paymentContainer}>
        <h2 className={styles.paymentTitle}>Shipping Options</h2>

        <div className={styles.shippingOptions}>
          <div
            className={`${styles.optionButton} ${
              selectedShipping === "standard" ? styles.selected : ""
            }`}
            onClick={() => setSelectedShipping("standard")}
          >
            <div className={styles.left}>
              <div className={styles.radioCircle} />
              <span className={styles.labelText}>Standard</span>
              <span className={styles.deliveryTime}>5–7 days</span>
            </div>
            <span className={styles.price}>FREE</span>
          </div>

          <div
            className={`${styles.optionButton} ${
              selectedShipping === "express" ? styles.selected : ""
            }`}
            onClick={() => setSelectedShipping("express")}
          >
            <div className={styles.left}>
              <div className={styles.radioCircle} />
              <span className={styles.labelText}>Express</span>
              <span className={styles.deliveryTime}>1–2 days</span>
            </div>
            <span className={styles.price}>R$12,00</span>
          </div>
        </div>

        <div className={styles.totalSection}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalPrice}>R${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Método de pagamento */}
      <div className={styles.paymentMethod}>
        <h2 className={styles.sectionTitle}>Payment Method</h2>
        <div className={`${styles.paymentBox} ${styles.methodBox}`}>
          <span className={styles.pixLabel}>Pix</span>
          <button className={styles.editButton}>
            <img src={editButtonIcon} alt="Edit Payment Method" />
          </button>
        </div>
      </div>

      {/* Total e botão */}
      <div className={styles.totalSection}>
        <p className={styles.totalLabel}>
          Total <span>${total.toFixed(2)}</span>
        </p>
        <button onClick={handlePayment} className={styles.payButton}>
          Pay
        </button>
      </div>
    </div>
  );
}

export { Payment };
