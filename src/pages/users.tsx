import { Button, notification } from "antd";
import { useState } from "react";
import FormOverlay from "../components/form-overlay";

export default function UsersPage() {
  const [addUser, setAddUser] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const newUserAdded = () => {
    setRefetch((prev) => !prev);
    api.success({ message: "Nuevo usuario añadido" });
  };
  return (
    <>
      {contextHolder}
      <FormOverlay
        onClose={() => setAddUser(false)}
        open={addUser}
        title="Añadir usuario"
      >
      </FormOverlay>
      <div className="page-title-container">
        <h1 className="page-title">Usuarios</h1>
        <Button
          onClick={() => setAddUser(true)}
          type="primary"
          children="Añadir"
          style={{
            borderRadius: "unset",
            fontWeight: "bold",
          }}
        />
      </div>
      <div></div>
      <div style={{ padding: "6rem" }}>
      </div>
    </>
  );
}
