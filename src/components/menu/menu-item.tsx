import { ReactNode, useState } from "react";
import UpArrow from "../../assets/up-arrow.svg";
import DownArrow from "../../assets/down-arrow.svg";
import styles from "./menu-item.module.scss";
import { NavLink } from "react-router-dom";

export function MenuParent(props: {
  children: ReactNode;
  icon: ReactNode;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={`${styles.parentItem} ${open ? styles.parentItemActive : " "}`}
    >
      <div onClick={() => setOpen(!open)} className={styles.content}>
        <span className={styles.label}>
          {props.icon} {props.label}
        </span>
        {open ? <img src={UpArrow} /> : <img src={DownArrow} />}
      </div>
      {open ? <ul className={styles.childrenList}>{props.children}</ul> : null}
    </li>
  );
}

export function MenuItem(props: {
  label: ReactNode;
  to: string;
  icon: ReactNode;
}) {
  return (
    <li className={styles.childItem}>
      <NavLink
        className={({ isActive }) =>
          `${styles.link} ${isActive && styles.linkActive}`
        }
        to={props.to}
      >
        <span className={styles.linkContent}>
          {props.icon} {props.label}
        </span>
      </NavLink>
    </li>
  );
}
