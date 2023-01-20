import { Col, Row, Form, Button, Input } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
import inputStyle from "../../styles/components/input";
import labelStyle from "../../styles/components/label";
import cancelButtonStyles from "../../styles/components/cancel-button";
import submitButtonStyle from "../../styles/components/submit-button";

const { Item } = Form;

export default function NewBrand(props: {
  onClose: Function;
  setRefetch: Function;
  api: NotificationInstance;
}) {
  const [brandSearch, setBrandSearch] = useState("qwertyuiop");
  const [formData, setFormData] = useState({});
 

  return <div>ok</div>
}
