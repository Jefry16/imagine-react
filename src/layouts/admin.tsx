import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import styles from "../styles/sass/admin-layout.module.scss";
export default function AdminLayout() {
  return (
    <div className={styles.admin}>
      <Sidebar />
      <div id="main" className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
