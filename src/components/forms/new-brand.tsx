import { Col, Row, Form, Button, Input } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/use-axios-private";
import useHttpPost from "../../hooks/use-http-post";
import cancelButtonStyles from "../../styles/components/cancel-button";
import inputStyle from "../../styles/components/input";
import labelStyle from "../../styles/components/label";
import submitButtonStyle from "../../styles/components/submit-button";

const { Item } = Form;

export default function NewBrand(props: {
  onClose: Function;
  setRefetch: Function;
  api: NotificationInstance;
}) {
  const axiosPrivate = useAxiosPrivate();
  const [brandSearch, setBrandSearch] = useState("qwertyuiop");
  const { sendRequest: sendPost } = useHttpPost();

  return (
    <Form
      onFinish={async (values) => {
        sendPost({
          url: "brands",
          data: { name: values.name },
          onSuccess: () => {
            props.onClose();
            props.setRefetch();
          },
          onError: () => {
            props.onClose();
            props.api.error({
              message: "Algo salió mal. Intentelo más tarde.",
            });
          },
        });
      }}
    >
      <Row>
        <Col span={24}>
          <Item
            name="name"
            label={<label style={labelStyle}>Nombre de la marca</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Añada un nombre" },
              { max: 255, message: "El nombre es muy largo" },
              {
                validator: async () => {
                  try {
                    await axiosPrivate.get(
                      `brands?name=${brandSearch}&exact=ok`
                    );
                    return Promise.reject(new Error("Esta marca ya existe."));
                  } catch (error) {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <Input
              autoComplete="off"
              onChange={({ target }) => {
                setBrandSearch(target.value);
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
