import { useState } from "react";

export default function UsersPage() {
  const [addUser, setAddUser] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const newUserAdded = () => {
    setRefetch((prev) => !prev);
  };
  return (
    <>
      
    </>
  );
}
