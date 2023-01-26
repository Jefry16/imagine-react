import { Button, Col, Form, Input, notification, Row } from "antd";
import Imaginelogo from "../assets/imagine-logo.svg";
import pplImg from "../assets/login-ppl.png";
import Cavelogo from "../assets/cave-logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/pages/login.module.scss";
import axios from "../api/axios";
import useAuth from "../hooks/use-auth";
const { Item } = Form;
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [api, contextHolder] = notification.useNotification();
  const { setAuth } = useAuth();
  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.top}>
        <img className={styles.logo} src={Imaginelogo} />
        <img className={styles.ppl} src={pplImg} />
      </div>
      <div className={styles.outter}>
        <Row className={styles.row}>
          <Col span={24} className={styles.col}>
            <img src={Cavelogo} className={styles.caveLogo} />
            <h1 className={styles.title}>Iniciar sesión</h1>
            <Form
              onFinish={async (data) => {
                const x = await axios.post("/auth/login", data);
                const { accessToken, username, roles } = x.data;
                setAuth({ accessToken, roles, username });
                setTimeout(() => {
                  navigate(from, { replace: true });
                }, 0);
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
              >
              </Item>
              <Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "introdusca una contraseña",
                  },
                ]}
              >
              </Item>
              <Item>
                <Button
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
