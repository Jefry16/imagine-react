import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
export default function NewCategory(props: {
  onClose: Function;
  setRefetch: Function;
  api: NotificationInstance;
}) {
  const [categorySearch, setCategorySearch] = useState("");

  const [formData, setFormData] = useState({});

  return <div>d</div>;
}
