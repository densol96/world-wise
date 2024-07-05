import styles from "./Spinner.module.css";

function Spinner({ children, widthHeightInRem = 6 }) {
  return (
    <div className={styles.spinnerContainer}>
      <span
        style={{
          width: `${widthHeightInRem}rem`,
          height: `${widthHeightInRem}rem`,
          borderWidth: `${widthHeightInRem * 0.14}rem`,
        }}
        class={styles.loader}
      ></span>
      <p className={styles.spinnerText}>
        Please, wait a second.. The page is loading...
      </p>
    </div>
  );
}

export default Spinner;
