import React from "react";
import { useGetProductsQuery } from "../store/productsApi";
import styles from "./ProductsPage.module.scss";

const ProductsPage: React.FC = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Ошибка при загрузке продуктов.</div>;
  }

  if (!products || products.length === 0) {
    return <div className={styles.empty}>Продукты не найдены.</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Продукты</h1>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <div key={index} className={styles.card}>
            <h2 className={styles.cardTitle}>{product.title}</h2>
            <p className={styles.cardDescription}>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
