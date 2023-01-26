import { NavLink, Outlet } from "react-router-dom";
import PosSidebar from "../components/pos-sidebar";
import styles from "../styles/sass/layout/pos-layout.module.scss";
export default function PosLayout() {
  return (
    <div className={styles.container}>
      <PosSidebar />
      <div id="main" className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
