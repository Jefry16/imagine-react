import { PlusOutlined } from "@ant-design/icons";
import { Button, notification, Space } from "antd";
import { useState } from "react";
import FormOverlay from "./form-overlay";

export default function Sizes() {
  const [refetch, setRefetch] = useState(false);
  const [addSize, setAddSize] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const newSizeAdded = () => {
    setRefetch((prev) => !prev);
    api.success({ message: "Nuevo tamaño añadido" });
  };
  return (
    <>
      {contextHolder}
      <Button
        onClick={() => setAddSize(true)}
        style={{ display: "block", marginLeft: "auto", marginBottom: "23px" }}
        type="primary"
        children={
          <div>
            Añadir tamaño <Space />
            <PlusOutlined />
          </div>
        }
      />
      
    </>
  );
}
