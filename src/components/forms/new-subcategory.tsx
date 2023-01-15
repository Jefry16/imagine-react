import { Col, Row, Form, Button, Input } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
import { usePatchtHttp, usePostHttp } from "../../hooks/http";
import inputStyle from "../../styles/components/input";
import labelStyle from "../../styles/components/label";

const { Item } = Form;

export default function NewSubCategory(props: {
  onClose: Function;
  setRefetch: Function;
  api: NotificationInstance;
  activeCategory: string;
}) {
  const [formData, setFormData] = useState({ subCategory: "" });
  const { mutate } = usePatchtHttp(
    `categories/${props.activeCategory}`,
    formData,
    {
      onSuccess: () => {
        props.onClose();
        props.setRefetch();
      },
    }
  );

  return (
    <Form
      onFinish={async (value) => {
        mutate();
      }}
    >
      <Row>
        <Col span={24}>
          <Item
            name="subCategory"
            label={<label style={labelStyle}>Nombre de la sub-categoría</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Añada un nombre" },
              { max: 255, message: "El nombre es muy largo" },
            ]}
          >
            <Input
              onChange={({ target }) => {
                setFormData({ subCategory: target.value });
              }}
              style={inputStyle}
            />
          </Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
          >
            <Button
              style={{
                borderRadius: "unset",
                fontWeight: "bold",
              }}
              children="Cancelar"
              onClick={() => props.onClose()}
              htmlType="button"
            />
            <Button
              style={{
                borderRadius: "unset",
                fontWeight: "bold",
                background: "#ff82a8",
              }}
              type="primary"
              children="Guardar"
              htmlType="submit"
            />
          </div>
        </Col>
      </Row>
    </Form>
  );
}
