import { Col, Row, Form, Button, Input } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
import useHttpPost from "../../hooks/use-http-post";
import cancelButtonStyles from "../../styles/components/cancel-button";
import inputStyle from "../../styles/components/input";
import labelStyle from "../../styles/components/label";
import submitButtonStyle from "../../styles/components/submit-button";
import useAxiosPrivate from "../../hooks/use-axios-private";

const { Item } = Form;

export default function NewSize(props: {
  onClose: Function;
  setRefetch: Function;
  api: NotificationInstance;
}) {
  const axiosPrivate = useAxiosPrivate();
  const [sizeSearch, setSizeSearch] = useState("qwertyuiop");
  const { sendRequest: sendPost } = useHttpPost();

  return (
    <Form
      onFinish={async (values) => {
        sendPost({
          url: "sizes",
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
            label={<label style={labelStyle}>Nombre de la categoría</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Añada un nombre" },
              { max: 255, message: "El nombre es muy largo" },
              {
                validator: async () => {
                  try {
                    await axiosPrivate.get(`sizes?name=${sizeSearch}&exact=ok`);
                    return Promise.reject(new Error("Este tamaño ya existe."));
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
                setSizeSearch(target.value);
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
