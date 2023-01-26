import { Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ExchangeRate from "../components/exchange-rate";
import useHttpGet from "../hooks/use-http-get";
import useHttpPatch from "../hooks/use-http-patch";
import styles from "../styles/pages/rate-exchange.module.scss";

export default function RateExchange() {
  const [values, setValues] = useState({});
  const [showActionButton, setShowActionButton] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [lastUpdateDate, setLastUpdateDate] = useState("cargando...");
  const [success, setSuccess] = useState(false);

  const { sendRequest } = useHttpGet();
  const { sendRequest: getLastUpdate } = useHttpGet();
  const { error, sendRequest: patchRequest, isLoading } = useHttpPatch();

  const handleChange = (id: number, value: number) => {
    setValues({ ...values, [id]: value });
    setShowActionButton(true);
  };

  useEffect(() => {
    sendRequest({
      url: "currencies",
      onSuccess: (data: any) => setCurrencies(data),
    });
  }, []);

  useEffect(() => {
    getLastUpdate({
      url: "currencies/lastUpdate",
      onSuccess: (data: any) => {
        const date = new Intl.DateTimeFormat("es-ES", {
          dateStyle: "long",
          timeStyle: "medium",
          timeZone: "America/Santo_Domingo",
        }).format(data.lastUpdate);
        setLastUpdateDate(date);
      },
    });
  }, [isLoading]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };
  return (
    <div>
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Cambios hechos
        </Alert>
      </Snackbar>
      <div className="page-title-container">
        <h1>Tasa de cambio</h1>
      </div>
      <div className={styles.lastUpdate}>
        <p>Última actualización: {lastUpdateDate}</p>
      </div>
      <div className={styles.container}>
        {currencies.length &&
          currencies.map((c: any) => {
            if (c.id === 1) {
              return;
            }
            return (
              <ExchangeRate
                key={c.id}
                currencyCode={c.currencyCode}
                icon={c.icon}
                id={c.id}
                value={c.value}
                onChange={handleChange}
              />
            );
          })}
      </div>
      {showActionButton && (
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => {
              setShowActionButton(false);
              patchRequest({
                url: "currencies",
                data: values,
                onSuccess: () => setSuccess(true),
              });
              setLastUpdateDate("cargando...");
            }}
            variant="contained"
          >
            Guardar cambios
          </Button>
        </div>
      )}
    </div>
  );
}
