import { Col, Row, Form, Button, Input } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
import cancelButtonStyles from "../../styles/components/cancel-button";
import inputStyle from "../../styles/components/input";
import labelStyle from "../../styles/components/label";
import submitButtonStyle from "../../styles/components/submit-button";

const { Item } = Form;

export default function NewSubCategory(props: {
  onClose: Function;
  setRefetch: Function;
  api: NotificationInstance;
  activeCategory: string;
}) {
  const [formData, setFormData] = useState({ subCategory: "" });

  return (
    <Form onFinish={async (value) => {}}>
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
              {
                validator(_, value) {
                  if (value.includes(",")) return Promise.reject();
                  return Promise.resolve();
                },
                message: "El nombre no puede contener comas",
              },
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
              style={cancelButtonStyles}
              children="Cancelar"
              onClick={() => props.onClose()}
              htmlType="button"
            />
            <Button
              style={submitButtonStyle}
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
