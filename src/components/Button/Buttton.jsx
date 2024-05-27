import styles from './Button.module.css';

function Buttton({ children, onClick, type }) {
  return (
    <button
      className={`${styles.btn} ${type ? styles[type] : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Buttton;
