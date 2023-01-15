import ExchangeRate from "../components/exchange-rate";
import styles from "../styles/pages/exchange-rate.module.scss";
import { useFetch, usePatchtHttp } from "../hooks/http";
import { Button, notification } from "antd";
import { useState } from "react";

export default function RateExchange() {
  const [values, setValues] = useState({});
  const [showActionButton, setShowActionButton] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { data, isLoading: loadingCurrencies } = useFetch("currencies", {});
  const { mutate } = usePatchtHttp("currencies", values, {
    onSuccess: () => api.success({ message: "¡Cambios hechos!" }),
    onError: () =>
      api.error({ message: "Algo salió mal, intentelo más tarde." }),
  });

  const handleChange = (id: number, value: number) => {
    setValues({ ...values, [id]: value });
    setShowActionButton(true);
    // mutate();
  };

  return (
    <div>
      {contextHolder}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4rem 6rem",
        }}
      >
        <h1 className="page-title">Tasa de cambio</h1>
      </div>
      <div className={styles.currencies}>
        {data?.data.map(
          (c: {
            id: number;
            icon: string;
            currencyCode: string;
            value: number;
          }) =>
            c.icon === "dop" ? null : (
              <ExchangeRate
                id={c.id}
                onChange={handleChange}
                key={c.id}
                icon={c.icon}
                currencyCode={c.currencyCode}
                value={c.value}
              />
            )
        )}
      </div>
      {showActionButton && (
        <div className={styles.action}>
          <Button
            onClick={() => {
              setShowActionButton(false);
              return mutate();
            }}
            className={styles.button}
            children="Guardar cambios"
            type="primary"
          />
        </div>
      )}
    </div>
  );
}
