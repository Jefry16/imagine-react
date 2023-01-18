import { PlusOutlined } from "@ant-design/icons";
import { Button, notification, Space } from "antd";
import { useState } from "react";
import { columns } from "../tables-config/columns/sub-categories";
import FormOverlay from "./form-overlay";
import NewSubCategory from "./forms/new-subcategory";
import CustomTable from "./table";

export default function SubCategories() {
  const [refetch, setRefetch] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const newSubCategoryAdded = () => {
    setRefetch((prev) => !prev);
    api.success({ message: "Nueva sub-categoría añadida" });
  };
  return (
    <>
      {contextHolder}
      <Button
        onClick={() => setAddSubCategory(true)}
        style={{ display: "block", marginLeft: "auto", marginBottom: "23px" }}
        type="primary"
        children={
          <div>
            Añadir sub-categoría <Space />
            <PlusOutlined />
          </div>
        }
      />
      <CustomTable url="subcategories" columns={columns} refetch={refetch} />
      <FormOverlay
        open={addSubCategory}
        title="Añadir sub-categoría"
        onClose={() => setAddSubCategory(false)}
      >
        <NewSubCategory
          activeCategory=""
          api={api}
          onClose={() => setAddSubCategory(false)}
          setRefetch={newSubCategoryAdded}
        />
      </FormOverlay>
    </>
  );
}
