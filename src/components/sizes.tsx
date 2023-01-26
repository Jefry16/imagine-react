import { useState } from "react";

export default function Sizes() {
  const [refetch, setRefetch] = useState(false);
  const [addSize, setAddSize] = useState(false);

  const newSizeAdded = () => {
    setRefetch((prev) => !prev);
  };
  return (
    <>
     
    </>
  );
}
