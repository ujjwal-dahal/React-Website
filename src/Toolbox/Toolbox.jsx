import styles from "./Toolbox.module.css";
import { useNavigate } from "react-router-dom";

export default function Toolbox() {
  const navigate = useNavigate();

  return (
    <div className={styles.toolboxContainer}>
      <h1 className={styles.toolboxTitle}>Toolbox</h1>

      <div className={styles.toolsSection}>
        <div className={styles.toolCard}>
          <h2 className={styles.toolTitle}>Calculator</h2>
          <p className={styles.toolDescription}>
            A handy calculator to perform basic arithmetic operations.
          </p>
          <button
            className={styles.toolButton}
            onClick={() => navigate("/calculator")}
          >
            Open Calculator
          </button>
        </div>

        <div className={styles.toolCard}>
          <h2 className={styles.toolTitle}>Currency Converter</h2>
          <p className={styles.toolDescription}>
            Quickly convert between various currencies in real-time.
          </p>
          <button
            className={styles.toolButton}
            onClick={() => navigate("/currencyconverter")}
          >
            Open Currency Converter
          </button>
        </div>
      </div>
    </div>
  );
}
