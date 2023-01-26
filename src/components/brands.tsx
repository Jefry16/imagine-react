import { useState } from "react";

export default function Brands() {
  const [addBrand, setAddBrand] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const newBrandAdded = () => {
    setRefetch((prev) => !prev);
  };
  return (
    <>
    </>
  );
}
