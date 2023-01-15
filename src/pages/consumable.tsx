import { Tabs } from "antd";
import Brands from "../components/brands";
import Categories from "../components/categories";
import Products from "../components/products";
import Sizes from "../components/sizes";

export default function ConsumablePage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4rem 6rem",
        }}
      >
        <h1 className="page-title">Productos</h1>
      </div>
      <div
        style={{
          padding: "4rem 6rem",
        }}
      >
        <Tabs
          destroyInactiveTabPane
          style={{ color: "white" }}
          items={[
            {
              children: <Products />,
              label: "Productos",
              key: "products",
            },
            {
              children: <Categories />,
              label: "Categorías",
              key: "category",
            },
            {
              children: <Brands />,
              label: "Marcas",
              key: "brands",
            },
            {
              children: <Sizes />,
              label: "Tamaños",
              key: "sizes",
            },
          ]}
        />
      </div>
    </>
  );
}
