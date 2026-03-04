import React, { useEffect } from "react";
import { useGetUserQuery } from "../store/api";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const { data: user, error, isLoading } = useGetUserQuery();

  useEffect(() => {
    if (error) {
      window.location.href = "/auth";
    }
  }, [error]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Произошла ошибка при загрузке данных</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Добро пожаловать!</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Выйти
        </button>
      </div>

      {user && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.avatar}>
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>
                {user.firstName} {user.lastName}
              </h2>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{user.email}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Имя:</span>
              <span className={styles.value}>{user.firstName}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Фамилия:</span>
              <span className={styles.value}>{user.lastName}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Возраст:</span>
              <span className={styles.value}>{user.age} лет</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
