import { ColumnsType } from "antd/lib/table";

export const columns: ColumnsType = [
  {
    title: "Foto de perfil",
    dataIndex: "profileImage",
    key: "profileImage",
    render: (text) =>
      text ? (
        <img
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #d4d4d4",
          }}
          src={`http://localhost:3000/uploads/images/${text}`}
        />
      ) : (
        ""
      ),
    width: "auto",
  },
  {
    title: "Usuario",
    dataIndex: "username",
    key: "username",
    width: "max-content",
  },
  {
    title: "Nombres",
    dataIndex: "firstName",
    key: "firstName",
    width: "max-content",
  },
  {
    title: "Apellidos",
    dataIndex: "lastName",
    key: "lastName",
    width: "max-content",
  },
  {
    title: "Roles",
    dataIndex: "roles",
    key: "roles",
    width: "max-content",
    render: (text) => {
      if (text) {
        return text.join(" | ");
      }
      return "";
    },
  },
  {
    title: "Activo",
    dataIndex: "active",
    key: "active",
    width: "max-content",
    render: (text) => (text ? <p>&#9989;</p> : <p> &#10060;</p>),
  },
];
