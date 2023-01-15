import { PlusOutlined } from "@ant-design/icons";
import { Button, notification, Space } from "antd";
import { useState } from "react";
import { columns } from "../tables-config/columns/consumables";
import FormOverlay from "./form-overlay";
import NewProduct from "./forms/new-product";
import CustomTable from "./table";

export default function Products() {
  const [addProduct, setAddProduct] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [refetch, setRefetch] = useState(false);

  const newProductAdded = () => {
    setRefetch((prev) => !prev);
    api.success({ message: "Nuevo producto añadido" });
  };

  return (
    <>
      {contextHolder}
      <Button
        onClick={() => setAddProduct(true)}
        style={{ display: "block", marginLeft: "auto", marginBottom: "23px" }}
        type="primary"
        children={
          <div>
            Añadir producto <Space />
            <PlusOutlined />
          </div>
        }
      />
      <CustomTable url="consumables" columns={columns} refetch={refetch} />
      <FormOverlay
        open={addProduct}
        title="Añadir producto"
        onClose={() => setAddProduct(false)}
      >
        <NewProduct
          api={api}
          onClose={() => setAddProduct(false)}
          setRefetch={newProductAdded}
        />
      </FormOverlay>
    </>
  );
}
