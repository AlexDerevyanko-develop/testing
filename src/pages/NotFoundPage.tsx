import React from "react";
import { Button } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.bg}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={styles.bubble}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.glowNumber}>404</div>

        <div className={styles.icon}>🚀</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 text-center mb-8 max-w-sm">
          Looks like you've ventured into uncharted territory. The page you're
          looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate({ to: "/" })}
            className={styles.primaryBtn}
          >
            Back to Dashboard
          </Button>
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
            className={styles.secondaryBtn}
          >
            Go Back
          </Button>
        </div>

        <div className={styles.dots}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ "--d": i } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
