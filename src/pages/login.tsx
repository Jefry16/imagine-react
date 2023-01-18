import { Button, Col, Form, Input, notification, Row } from "antd";
import labelStyle from "../styles/components/label";
import inputStyle from "../styles/components/input";
import Imaginelogo from "../assets/imagine-logo.svg";
import pplImg from "../assets/login-ppl.png";
import Cavelogo from "../assets/cave-logo.svg";
import { usePostHttp } from "../hooks/http";
import { useState } from "react";
import useAuth from "../hooks/use-auth";
import { useLocation, useNavigate } from "react-router-dom";
const { Item } = Form;
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { updateAuth } = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const { mutate, isLoading } = usePostHttp(
    "auth/login",
    credentials,
    {},
    {
      onError: (x: any) => {
        console.log(x.request.status);
        if (x.request.status === 0) {
          api.error({ message: "Inicio de sesion fallido" });
        } else if (x.response.status === 401) {
          api.error({ message: "Credenciales incorrectas" });
        }
      },
      onSuccess: async ({ data }: any) => {
        updateAuth(data.accessToken, data.username, data.id, data.roles);
        setTimeout(() => navigate(from, { replace: true }), 0);
      },
    }
  );
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        maxHeight: "100vh",
        padding: 0,
      }}
    >
      {contextHolder}
      <div
        style={{
          position: "relative",
          height: "100%",
          padding: 0,
          width: "100%",
        }}
      >
        <img
          style={{ position: "absolute", top: "68px", left: "68px" }}
          src={Imaginelogo}
        />
        <img
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            background: "#161819",
            objectFit: "cover",
          }}
          src={pplImg}
        />
      </div>
      <div
        style={{ background: "#161819", minHeight: "100vh", width: "499px" }}
      >
        <Row
          style={{
            maxWidth: "300px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Col span={24} style={{ display: "flex", flexDirection: "column" }}>
            <img
              src={Cavelogo}
              style={{ width: "101px", margin: "138px auto 80px" }}
            />
            <h1 style={{ color: "white", marginBottom: "40px" }}>
              Iniciar sesión
            </h1>
            <Form
              onFinish={() => {
                mutate();
              }}
            >
              <Item
                rules={[
                  {
                    required: true,
                    message: "introdusca un nombre de usuario",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="username"
                label={
                  <label style={{ ...labelStyle }}>Nombre de usuario</label>
                }
              >
                <Input
                  onChange={({ target }) => {
                    target.value;
                    setCredentials((prev) => ({
                      ...prev,
                      username: target.value,
                    }));
                  }}
                  style={{ ...inputStyle }}
                />
              </Item>
              <Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="password"
                label={<label style={{ ...labelStyle }}>Contraseña</label>}
                rules={[
                  {
                    required: true,
                    message: "introdusca una contraseña",
                  },
                ]}
              >
                <Input
                  onChange={({ target }) => {
                    setCredentials((prev) => ({
                      ...prev,
                      password: target.value,
                    }));
                  }}
                  type="password"
                  style={{ ...inputStyle }}
                />
              </Item>
              <Item>
                <Button
                  loading={isLoading}
                  style={{
                    borderRadius: "unset",
                    fontWeight: "bold",
                    background: "#ff82a8",
                  }}
                  type="primary"
                  children="Entrar"
                  htmlType="submit"
                />
              </Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
