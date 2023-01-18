import { NavLink } from "react-router-dom";
import styles from "./pos-category.module.scss";

export default function PosCategory(props: { cat: any; onClick: () => void }) {
  return (
    <article>
      <NavLink
        onClick={() => props.onClick()}
        className={styles.posCategory}
        to={`/punto-de-venta/productos?categoryName=${
          props.cat.name
        }&subCategories=${props.cat.subCategories.join(",")}`}
      >
        {props.cat.name.toUpperCase()}
      </NavLink>
    </article>
  );
}
