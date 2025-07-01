import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import type { IUser } from "../interfaces";

interface UserContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => Promise<void>;
}

// Contexto padrão (para evitar erro ao usar useContext sem Provider)
export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

// 4. Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Erro no login");
        return;
      }

      setUser(data.user);
      console.log(data.user);
      // salvar token no localStorage (ou cookies, dependendo do seu fluxo)
      localStorage.setItem("token", data.token);


      // navega para a página de perfil
      navigate("/profile");
    } catch (error) {
      setErrorMsg("Sua senha ou email estão incorretos.");
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        email,
        setEmail,
        password,
        setPassword,
        errorMsg,
        setErrorMsg,
        handleLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
