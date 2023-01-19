import { Button, Col, Form, Input, Row } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
import { useFetch, usePostHttp } from "../../hooks/http";
import inputStyle from "../../styles/components/input";
import labelStyle from "../../styles/components/label";
import cancelButtonStyles from "../../styles/components/cancel-button";
import submitButtonStyle from "../../styles/components/submit-button";

const { Item } = Form;

export default function NewCategory(props: {
  onClose: Function;
  setRefetch: Function;
  api: NotificationInstance;
}) {
  const [categorySearch, setCategorySearch] = useState("");
  const { status } = useFetch(`categories?name=${categorySearch}`, {
    retry: false,
  });
  const [formData, setFormData] = useState({});
  const { mutate, isLoading } = usePostHttp(
    "categories",
    formData,
    {},
    {
      onSuccess: () => {
        props.onClose();
        props.setRefetch();
      },

      onError: (x: any) => {
        if (x.response.status === 400 || x.response.status === 500) {
          props.api.error({ message: "Algo salio mal" });
          props.onClose();
        }
      },
    }
  );

  return (
    <Form
      onFinish={async () => {
        mutate();
      }}
    >
      <Row>
        <Col span={24}>
          <Item
            name="name"
            label={<label style={labelStyle}>Nombre de la categoría</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Añada un nombre" },
              { max: 255, message: "El nombre es muy largo" },
              {
                validator: () => {
                  if (status === "success" && categorySearch.length > 0) {
                    return Promise.reject();
                  }
                  return Promise.resolve();
                },
                message: "Esta categoría ya existe",
              },
            ]}
          >
            <Input
              autoComplete="off"
              onChange={({ target }) => {
                setCategorySearch(target.value);
                setFormData((prev) => ({ ...prev, name: target.value }));
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
              loading={isLoading}
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
