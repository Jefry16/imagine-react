import { useState } from "react";

export default function SubCategories() {
  const [refetch, setRefetch] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);

  const newSubCategoryAdded = () => {
    setRefetch((prev) => !prev);
  };
  return <></>;
}
