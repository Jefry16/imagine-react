import { useState } from "react";

export default function Categories() {
  const [refetch, setRefetch] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [categoryId, setCategoryId] = useState();

  const newAdded = (what: string) => {
    setRefetch((prev) => !prev);
  };
  return <></>;
}
