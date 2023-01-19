import { Col, Row, Form, Button, Input } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
import { useFetch, usePostHttp } from "../../hooks/http";
import cancelButtonStyles from "../../styles/components/cancel-button";
import inputStyle from "../../styles/components/input";
import labelStyle from "../../styles/components/label";
import submitButtonStyle from "../../styles/components/submit-button";

const { Item } = Form;

export default function NewSize(props: {
  onClose: Function;
  setRefetch: Function;
  api: NotificationInstance;
}) {
  const [brandSearch, setBrandSearch] = useState("qwertyuiop");
  const [formData, setFormData] = useState({});
  const { status } = useFetch(`sizes?name=${brandSearch}`, {
    retry: false,
  });
  const { isLoading, mutate } = usePostHttp(
    "sizes",
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
                  if (status === "success" && brandSearch.length > 0) {
                    return Promise.reject();
                  }
                  return Promise.resolve();
                },
                message: "El tamaño ya existe",
              },
            ]}
          >
            <Input
              onChange={({ target }) => {
                setBrandSearch(target.value);
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
