import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../store/api";
import styles from "./AuthPage.module.scss";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const result = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        localStorage.setItem("token", result.token);
        window.location.href = "/";
      } else {
        const result = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: parseInt(formData.age),
        }).unwrap();
        localStorage.setItem("token", result.token);
        window.location.href = "/";
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      setError(error.data?.message || "Произошла ошибка. Попробуйте снова.");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      age: "",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>{isLogin ? "Вход" : "Регистрация"}</h1>
          <p className={styles.subtitle}>
            {isLogin
              ? "Добро пожаловать! Войдите в свой аккаунт"
              : "Создайте новый аккаунт"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Имя</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Иван"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Фамилия</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Иванов"
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Возраст</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="18"
                  min="1"
                  max="120"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoginLoading || isRegisterLoading}
          >
            {isLoginLoading || isRegisterLoading
              ? "Загрузка..."
              : isLogin
                ? "Войти"
                : "Зарегистрироваться"}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <button onClick={toggleMode} className={styles.toggleBtn}>
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
