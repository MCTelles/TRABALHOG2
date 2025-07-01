import { useNavigate } from "react-router";

import logoShopee from "../../assets/logoShopeeAMF.png";
import { Loader } from "../../components/Loader/Loader";
import { useFakeLoading } from "../../hooks/useFakingLoading";

import styles from "./Start.module.scss";

function Start() {
  const navigate = useNavigate();

  const loading = useFakeLoading(1500);

  if (loading) return <Loader />;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.circuloLogo}>
        <img src={logoShopee} alt="" />
      </div>

      <h1>ShopeeAMF</h1>

      <span className={styles.greetingsSpan}>
        Beautiful eCommerce UI Kit for your online store
      </span>

      <button
        className={styles.createAccount}
        type="button"
        onClick={() => {
          navigate("/create-account");
        }}
      >
        Let's get started
      </button>

      <button
        className={styles.loginHomeContainer}
        type="button"
        onClick={() => {
          navigate("/login");
        }}
      >
        <span className={styles.accountCreateSpan}>
          I already have an account
        </span>
      </button>
    </div>
  );
}

export { Start };
