import { Outlet } from "react-router-dom";
import styles from "../styles/sass/admin-layout.module.scss";
export default function PosLayout() {
  return (
    <div className={styles.admin}>
        oooooo
      <div id="main" className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
