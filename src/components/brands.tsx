import { PlusOutlined } from "@ant-design/icons";
import { Button, notification, Space } from "antd";
import { useState } from "react";
import { columns } from "../tables-config/columns/brands";
import FormOverlay from "./form-overlay";
import NewBrand from "./forms/new-brand";
import CustomTable from "./table";

export default function Brands() {
  const [api, contextHolder] = notification.useNotification();
  const [addBrand, setAddBrand] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const newBrandAdded = () => {
    setRefetch((prev) => !prev);
    api.success({ message: "Nueva marca añadida" });
  };
  return (
    <>
      {contextHolder}
      <Button
        onClick={() => setAddBrand(true)}
        style={{ display: "block", marginLeft: "auto", marginBottom: "23px" }}
        type="primary"
        children={
          <div>
            Añadir marca <Space />
            <PlusOutlined />
          </div>
        }
      />
      <CustomTable url="brands" columns={columns} refetch={refetch} />
      <FormOverlay
        open={addBrand}
        title="Añadir marca"
        onClose={() => setAddBrand(false)}
      >
        <NewBrand
          api={api}
          onClose={() => {
            setAddBrand(false);
          }}
          setRefetch={newBrandAdded}
        />
      </FormOverlay>
    </>
  );
}
