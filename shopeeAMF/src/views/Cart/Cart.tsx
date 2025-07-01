import { useState } from "react";
import { useNavigate } from "react-router";
import { useProducts } from "../../hooks/useProducts";
import { useUser } from "../../hooks/useUser";

import editButtonIcon from "../../assets/editButton.png";
import moreButton from "../../assets/moreButton.svg";
import lessButton from "../../assets/lessButton.svg";
import deleteButton from "../../assets/deleteButton.svg";

import styles from "./Cart.module.scss";

function Cart() {
  const { cart, setCart } = useProducts();
  const { user, setUser } = useUser();
  const [editingAddress, setEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(user.address || "");

  console.log("Salvando endereço para user:", user);

  const setSaving = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/address/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: newAddress }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser((prev) => ({ ...prev, address: newAddress }));
        setEditingAddress(false);
      } else {
        alert(data.message || "Erro ao atualizar endereço");
      }
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
    }
  };

  const cancelEdit = () => {
    setNewAddress(user.address || "");
    setEditingAddress(false);
  };

  const increment = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decrement = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  };

  const remove = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const navigate = useNavigate();

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartLabel}>Cart</h2>

      <div className={styles.addressCard}>
        <h2 className={styles.shippingLabel}>Shipping Address</h2>

        <div className={styles.addressInfo}>
          {editingAddress ? (
            <>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className={styles.addressInput}
              />
              <button onClick={setSaving} className={styles.saveButton}>
                Save
              </button>
              <button onClick={cancelEdit} className={styles.cancelButton}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>{user.address || "Seu endereço aqui"}</p>
              <button
                className={styles.editButton}
                onClick={() => setEditingAddress(true)}
              >
                <img src={editButtonIcon} alt="Edit Address" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.productsList}>
        {cart.map((item) => (
          <div key={item._id} className={styles.productItem}>
            <img
              className={styles.productImage}
              src={item.productImage}
              alt={item.productName}
            />

            <div className={styles.productInfo}>
              <p>{item.productName}</p>

              <h2>${item.price.toFixed(2)}</h2>
            </div>
            <div className={styles.controls}>
              <button
                disabled={item.quantity === 1}
                onClick={() => decrement(item._id)}
              >
                <img src={lessButton} />
              </button>

              <span>{item.quantity || 1}</span>

              <button onClick={() => increment(item._id)}>
                <img src={moreButton} />
              </button>

              <button
                className={styles.deleteBtn}
                onClick={() => remove(item._id)}
              >
                <img src={deleteButton} alt="remover" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.checkoutBar}>
        <h2 className={styles.totalLabel}>
          Total <span>${total.toFixed(2)}</span>
        </h2>
        <button
          className={styles.checkoutButton}
          onClick={() => {
            navigate("/payment");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export { Cart };
