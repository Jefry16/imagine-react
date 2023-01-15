import { ColumnsType } from "antd/lib/table";

export const columns: ColumnsType = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    width: "auto",
  },
  {
    title: "Tamaño",
    dataIndex: "size",
    key: "size",
    width: "auto",
    render: (text) => {
      if (text) {
        return text.name;
      }
      return "";
    },
  },

  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    width: "auto",
    render: (text) => {
      if (text) {
        return new Intl.NumberFormat(navigator.language, {
          style: "currency",
          currency: "DOP",
        }).format(text);
      }
      return "";
    },
  },
  {
    title: "Marca",
    dataIndex: "brand",
    key: "brand",
    width: "auto",
    render: (text) => {
      if (text) {
        return text.name;
      }
      return "";
    },
  },
  {
    title: "Sub-categoría",
    dataIndex: "subCategory",
    key: "subCategory",
    width: "auto",
  },
  {
    title: "Categoría",
    dataIndex: "category",
    key: "category",
    width: "auto",
    render: (text) => {
      if (text) {
        return text.name;
      }
      return "";
    },
  },
];
