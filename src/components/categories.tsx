import { PlusOutlined } from "@ant-design/icons";
import { Button, List, notification, Space } from "antd";
import { useState } from "react";
import { columns } from "../tables-config/columns/categories";
import FormOverlay from "./form-overlay";
import NewCategory from "./forms/new-category";
import NewSubCategory from "./forms/new-subcategory";
import CustomTable from "./table";

const { Item } = List;
export default function Categories() {
  const [refetch, setRefetch] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [categoryId, setCategoryId] = useState();

  const newAdded = (what: string) => {
    setRefetch((prev) => !prev);
    api.success({ message: `Nueva ${what} añadida` });
  };
  return (
    <>
      {contextHolder}
      <Button
        onClick={() => setAddCategory(true)}
        style={{ display: "block", marginLeft: "auto", marginBottom: "23px" }}
        type="primary"
        children={
          <div>
            Añadir categoría <Space />
            <PlusOutlined />
          </div>
        }
      />
      <CustomTable
        url="categories?name=%%"
        columns={columns}
        refetch={refetch}
        expandable={{
          expandedRowRender: (record) => (
            <List
              dataSource={record.subCategories}
              renderItem={(item: string) => <Item children={item} />}
            >
              <Button
                onClick={() => {
                  setAddSubCategory(true);
                  setCategoryId(record.id);
                }}
                children={
                  <div>
                    Añadir sub-categoría <Space />
                    <PlusOutlined />
                  </div>
                }
                type="primary"
              />
            </List>
          ),
          rowExpandable: (record) => record.name,
        }}
      />

      <FormOverlay
        open={addCategory}
        title="Añadir categoría"
        onClose={() => setAddCategory(false)}
      >
        <NewCategory
          api={api}
          onClose={() => setAddCategory(false)}
          setRefetch={() => newAdded("categoría")}
        />
      </FormOverlay>

      <FormOverlay
        open={addSubCategory}
        title="Añadir sub-categoría"
        onClose={() => setAddSubCategory(false)}
      >
        <NewSubCategory
        categoryId={categoryId}
          api={api}
          onClose={() => setAddSubCategory(false)}
          setRefetch={() => newAdded("sub-categoría")}
        />
      </FormOverlay>
    </>
  );
}
