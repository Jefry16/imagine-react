import styles from "./pos-sidebar.module.scss";
import Cavelogo from "../assets/cave-logo.svg";
import ProductIcon from "../assets/products-icon.svg";
import OpenBarIcon from "../assets/open-bar.svg";
import VipIcon from "../assets/vip-icon.svg";
import GroupIcon from "../assets/group-icon.svg";
import InternetIcon from "../assets/internet-icon.svg";
import { NavLink } from "react-router-dom";

export default function PosSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoCave}>
        <img src={Cavelogo} className={styles.logoCave} />
      </div>
      <ul className={styles.menu}>
        <li className={styles.linkContainer}>
          <NavLink className={styles.link} to="/punto-de-venta/productos">
            <img src={ProductIcon} />
            <span>PRODUCTOS</span>
          </NavLink>
        </li>
        <li className={styles.linkContainer}>
          <NavLink className={styles.link} to="/punto-de-venta/open-bar">
            <img src={OpenBarIcon} />
            <span>OPEN BAR</span>
          </NavLink>
        </li>
        <li className={styles.linkContainer}>
          <NavLink className={styles.link} to="/punto-de-venta/productos">
            <img src={VipIcon} />
            <span>MESAS VIP</span>
          </NavLink>
        </li>
        <li className={styles.linkContainer}>
          <NavLink className={styles.link} to="/punto-de-venta/productos">
            <img src={GroupIcon} />
            <span>EVENTOS</span>
          </NavLink>
        </li>
        <li className={styles.linkContainer}>
          <NavLink className={styles.link} to="/punto-de-venta/productos">
            <img src={InternetIcon} />
            <span>INTERNET</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
