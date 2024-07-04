import styles from "./Logo.module.css";

function Logo() {
  console.log("logo");
  return <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />;
}

export default Logo;
