import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import FormOverlay from "./form-overlay";

export default function SubCategories() {
  const [refetch, setRefetch] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);

  const newSubCategoryAdded = () => {
    setRefetch((prev) => !prev);
  };
  return <></>;
}
