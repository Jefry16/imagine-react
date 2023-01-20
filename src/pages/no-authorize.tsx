import { useNavigate } from "react-router-dom";

export default function NoAuthorized() {
  const navigate = useNavigate();
  return (
    <p>
      "no autorizado" <button onClick={() => navigate(-1)}>go back</button>
    </p>
  );
}
