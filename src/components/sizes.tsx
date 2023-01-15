import { PlusOutlined } from "@ant-design/icons";
import { Button, notification, Space } from "antd";
import { useState } from "react";
import { columns } from "../tables-config/columns/sizes";
import FormOverlay from "./form-overlay";
import NewSize from "./forms/new-size";
import CustomTable from "./table";

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
      <CustomTable url="sizes" columns={columns} refetch={refetch} />

      <FormOverlay
        open={addSize}
        title="Añadir tamaño"
        onClose={() => setAddSize(false)}
      >
        <NewSize
          api={api}
          onClose={() => setAddSize(false)}
          setRefetch={newSizeAdded}
        />
      </FormOverlay>
    </>
  );
}
