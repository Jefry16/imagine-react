import { PlusOutlined } from "@ant-design/icons";
import { Button, notification, Space } from "antd";
import { useState } from "react";
import FormOverlay from "./form-overlay";

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
     
    </>
  );
}
