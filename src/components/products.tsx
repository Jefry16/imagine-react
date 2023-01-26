import { useState } from "react";

export default function Products() {
  const [addProduct, setAddProduct] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const newProductAdded = () => {
    setRefetch((prev) => !prev);
  };

  return (
    <>
    
     
    </>
  );
}
