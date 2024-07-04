import styles from "./Footer.module.css";
import { useNavigate, useParams } from "react-router-dom";
function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.footer}>
        &copy; Copyright {new Date().getFullYear()} by WorlWise Inc.
      </p>
    </div>
  );
}

export default Footer;
