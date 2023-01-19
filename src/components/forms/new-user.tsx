import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Upload } from "antd";
import { useState } from "react";
import { useFetch, usePostHttp } from "../../hooks/http";
import cancelButtonStyles from "../../styles/components/cancel-button";
import inputStyle from "../../styles/components/input";
import labelStyle from "../../styles/components/label";
import submitButtonStyle from "../../styles/components/submit-button";
import style from "./new-user.module.scss";
const { Item } = Form;
export default function NewUser(props: {
  onClose: Function;
  setRefetch: Function;
}) {
  const [userSearch, setUserSearch] = useState("qwertyuiop");
  const { status } = useFetch(`users?username=${userSearch}`, {
    retry: false,
  });

  const [_, setFormValues] = useState({});
  const [formData, setFormData] = useState({});
  const { mutate, isLoading } = usePostHttp(
    "users",
    formData,
    {},
    {
      onSuccess: () => {
        props.onClose();
        props.setRefetch();
      },
    }
  );

  return (
    <Form
      onValuesChange={(value) => {
        setFormValues((prev) => {
          const updatedFormValues = { ...prev, ...value };
          const formData = new FormData();
          for (const key in updatedFormValues) {
            if (key === "image") {
              formData.append("image", updatedFormValues[key].file);
            } else {
              formData.append(key, updatedFormValues[key]);
            }
          }
          setFormData(formData);
          return updatedFormValues;
        });
      }}
      onFinish={async () => {
        mutate();
      }}
    >
      <Row>
        <Col span={24}>
          <Item
            name="username"
            label={<label style={labelStyle}>Nombre de usuario</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "añada un nombre de usuario" },
              { min: 5, message: "entre 5 y 10 caracteres", max: 10 },
              {
                validator: async () => {
                  if (status === "success") {
                    return Promise.reject();
                  }
                  return Promise.resolve();
                },
                message: "nombre de usuario ya existe",
              },
            ]}
          >
            <Input
              autoComplete="off"
              style={inputStyle}
              onChange={({ target }) => {
                setUserSearch(target.value);
              }}
            />
          </Item>
          <Item
            name="firstName"
            label={<label style={labelStyle}>Nombre</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "añada un nombre" },
              { max: 255, message: "el nombre es muy largo" },
            ]}
          >
            <Input style={inputStyle} />
          </Item>
          <Item
            name="lastName"
            label={<label style={labelStyle}>Apellidos</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "añada al menos un apellido" },
              { max: 255, message: "el apellido es muy largo" },
            ]}
          >
            <Input style={inputStyle} />
          </Item>
          <Item
            name="roles"
            label={<label style={labelStyle}>Roles</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "añada al menos un rol" }]}
          >
            <Checkbox.Group style={{ flexDirection: "column" }}>
              {[
                "administrador",
                "camarero",
                "cajero",
                "supervisor",
                "superadmin",
              ].map((rol: string) => (
                <div key={rol}>
                  <Checkbox value={rol} children={rol} />
                </div>
              ))}
            </Checkbox.Group>
          </Item>
          <Item
            className={style.label}
            name="image"
            label="Foto de perfil"
            valuePropName="image"
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>
                Subir (.png .jpg .jpeg .svg)
              </Button>
            </Upload>
          </Item>

          <Item
            name="password"
            label={<label style={labelStyle}>Contraseña</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                min: 6,
                required: true,
                message: "añada una contraseña de 6 caracteres al menos",
              },
            ]}
          >
            <Input style={inputStyle} type="password" />
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
