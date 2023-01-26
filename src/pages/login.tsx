import Imaginelogo from "../assets/imagine-logo.svg";
import pplImg from "../assets/login-ppl.png";
import Cavelogo from "../assets/cave-logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/pages/login.module.scss";
import axios from "../api/axios";
import useAuth from "../hooks/use-auth";
import { ButtonUnstyled } from "@mui/base";

import { styled } from "@mui/system";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();
  const scss = styled("button")`
    color: red;
  `;
  return <></>;
}
