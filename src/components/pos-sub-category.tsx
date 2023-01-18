import { NavLink } from "react-router-dom";
import useQuery from "../hooks/use-query";
import styles from "./pos-category.module.scss";

export default function PosSubCategory(props: {
  sub: string;
  onClick: () => void;
}) {
  const query = useQuery();
  const { get } = query;
  return (
    <article>
      <NavLink
        onClick={() => props.onClick()}
        className={styles.posCategory}
        to={`?categoryName=${query.get(
          "categoryName"
        )}&subCategories=${query.get("subCategories")}&list=${props.sub}`}
      >
        {props.sub.toUpperCase()}
      </NavLink>
    </article>
  );
}
