import styles from "./sidebar.module.scss";
import Imaginelogo from "../assets/imagine-logo.svg";
import Cavelogo from "../assets/cave-logo.svg";
import Menu from "./menu/menu";
export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoCave}>
        <img src={Cavelogo} className={styles.logoCave} />
      </div>
      <Menu />
      <div>
        <img src={Imaginelogo} className={styles.logoImagine} />
      </div>
    </aside>
  );
}
