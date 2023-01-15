import { MenuItem, MenuParent } from "./menu-item";
import cartIcon from "../../assets/cart-icon.svg";
import userIcon from "../../assets/user-icon.svg";
import reateIcon from "../../assets/rate-icon.svg";
import styles from "./menu.module.scss";
export default function Menu() {
  return (
    <ul className={styles.menu}>
      <MenuParent icon={<img src={cartIcon} />} label="Producto">
        <MenuItem icon="" to="open-bar" label="Open bar" />
        <MenuItem icon="" to="mesas-vip" label="Mesas VIP" />
        <MenuItem icon="" to="grupos-eventos" label="Grupos / Eventos" />
        <MenuItem icon="" to="productos" label="Productos" />
      </MenuParent>
      <MenuItem icon={<img src={userIcon} />} to="usuarios" label="Usuarios" />
      <MenuItem icon={<img src={reateIcon} />} to="tasas-de-cambio" label="Tasas de cambio" />
    </ul>
  );
}
