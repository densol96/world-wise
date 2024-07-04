import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import { useParams } from "react-router-dom";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
