import { Button, notification } from "antd";
import { useState } from "react";
import FormOverlay from "../components/form-overlay";
import NewUser from "../components/forms/new-user";
import CustomTable from "../components/table";
import { columns } from "../tables-config/columns/users";

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
        <NewUser setRefetch={newUserAdded} onClose={() => setAddUser(false)} />
      </FormOverlay>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4rem 6rem",
        }}
      >
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
        <CustomTable url="users" refetch={refetch} columns={columns} />
      </div>
    </>
  );
}
