import PosCategory from "../../components/pos-category";
import styles from "../../styles/pages/pos-product.module.scss";
import { useFetch } from "../../hooks/http";
import { useEffect, useState } from "react";
import useQuery from "../../hooks/use-query";
import { createBrowserRouter } from "react-router-dom";
import PosSubCategory from "../../components/pos-sub-category";

export default function Products() {
  const query = useQuery();
  const history = createBrowserRouter([{}]);
  const [viewSubCategory, setViewSubCategory] = useState(false);
  const [viewCategory, setViewCategory] = useState(true);
  const [viewProductList, setViewProductList] = useState(false);
  const { data, isLoading } = useFetch("categories?name=%%", {});
  useEffect(() => {
    setViewCategory(
      !(
        Boolean(query.get("categoryName")) &&
        Boolean(query.get("subCategories"))
      )
    );
    setViewSubCategory(
      Boolean(query.get("categoryName")) &&
        Boolean(query.get("subCategories")) &&
        !Boolean(query.get("list"))
    );

    setViewProductList(
      Boolean(query.get("categoryName")) &&
        Boolean(query.get("subCategories")) &&
        Boolean(query.get("list"))
    );
  }, [history]);

  return (
    <main>
      <div className="pos-header">
        <h2>Productos</h2>
      </div>
      <div className={styles.categories} style={{ padding: "8rem" }}>
        {viewCategory && (
          <>
            {data?.data.map((cat: any) => (
              <PosCategory
                onClick={() => setViewCategory(true)}
                cat={cat}
                key={cat.name}
              />
            ))}
          </>
        )}
        {viewSubCategory && (
          <>
            {query
              .get("subCategories")
              ?.split(",")
              .map((sub) => (
                <PosSubCategory sub={sub} key={sub} onClick={() => {}} />
              ))}
          </>
        )}
        {viewProductList.toString()}
      </div>
    </main>
  );
}
