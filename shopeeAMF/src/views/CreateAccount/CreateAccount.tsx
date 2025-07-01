import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import uploadPhoto from "../../assets/uploadPhoto.png";
import { useFakeLoading } from "../../hooks/useFakingLoading";
import { Loader } from "../../components/Loader/Loader";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

import styles from "./CreateAccount.module.scss";

// ✅ Validação com Yup
const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  phone: yup
    .string()
    .matches(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 números")
    .required("Telefone é obrigatório"),
});

type FormData = yup.InferType<typeof schema>;

function CreateAccount() {
  const navigate = useNavigate();
  const loading = useFakeLoading(2500);
  const [countryCode, setCountryCode] = useState("BR");
  const [type, setType] = useState("password");
  const [photo, setPhoto] = useState<File | null>(null);
  const [createdUser, setCreatedUser] = useState<null | { photo: string }>(
    null
  );

  const { setUser } = useUser();

  const flagUrl = `https://flagsapi.com/${countryCode}/shiny/64.png`;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  if (loading) return <Loader />;

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", `+${getDialCode(countryCode)}${data.phone}`);
    if (photo) formData.append("photo", photo);

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        console.log("✅ Usuário criado:", result);
        setCreatedUser(result.user); // Salva dados do usuário, incluindo photo
        setUser(result.user);
        navigate("/profile");
      } else {
        console.error("❌ Erro:", result.message);
      }
    } catch (err) {
      console.error("❌ Erro ao enviar:", err);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPhoto(file);
  };

  const handleToggle = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  const getDialCode = (country: string) => {
    const codes: Record<string, string> = {
      BR: "55",
      US: "1",
      FR: "33",
    };
    return codes[country] || "";
  };

  return (
    <div className={styles.createAccountContainer}>
      <h1>Create Account</h1>

      <label htmlFor="photoUpload" className={styles.photoUploadLabel}>
        <img src={uploadPhoto} alt="Upload Photo" />
      </label>
      <input
        type="file"
        id="photoUpload"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handlePhotoUpload}
      />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          className={styles.inputEmail}
          {...register("email")}
        />
        <p className={styles.error}>{errors.email?.message}</p>

        <div className={styles.passwordContainer}>
          <input
            type={type}
            placeholder="Password"
            className={styles.inputPassword}
            {...register("password")}
          />
          <span onClick={handleToggle} className={styles.eyeInput}>
            {type === "password" ? <EyeIcon /> : <EyeSlashIcon />}
          </span>
        </div>
        <p className={styles.error}>{errors.password?.message}</p>

        <div className={styles.phoneInput}>
          <img
            className={styles.flag}
            src={flagUrl}
            alt={`${countryCode} flag`}
          />

          <select
            className={styles.countryCode}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="BR">+55</option>
            <option value="US">+1</option>
            <option value="FR">+33</option>
          </select>

          <div className={styles.separator}></div>

          <input
            type="tel"
            placeholder="Your number"
            className={styles.phonefield}
            {...register("phone")}
            onChange={(e) => {
              setValue("phone", e.target.value);
            }}
          />
        </div>
        <p className={styles.error}>{errors.phone?.message}</p>

        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.buttonFormat} ${styles.doneButton}`}
            type="submit"
          >
            Done
          </button>

          <button
            className={`${styles.buttonFormat} ${styles.cancelButton}`}
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export { CreateAccount };
export default CreateAccount;
