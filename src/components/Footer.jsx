import styles from "./Footer.module.css";

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
