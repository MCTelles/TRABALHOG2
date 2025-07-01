import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";

import styles from "./Login.module.scss";

function Login() {
  const { email, errorMsg, handleLogin, password, setEmail, setPassword } =
    useUser();

  const navigate = useNavigate();

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>

      <span>Good to see you back! ❤</span>
      <input
        type="email"
        name="email"
        autoComplete="on"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <button className={styles.loginButton} onClick={handleLogin}>
        Login
      </button>

      <button
        className={styles.loginCancelButton}
        onClick={() => {
          navigate("/");
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export { Login };
