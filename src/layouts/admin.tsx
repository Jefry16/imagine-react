import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import styles from "../styles/sass/admin-layout.module.scss";
export default function AdminLayout() {
  return (
    <div className={styles.admin}>
      {/* <p onClick={() => logOut()}>logout</p> */}
      <Sidebar />

      <div id="main" className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
