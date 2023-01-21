import ExchangeRate from "../components/exchange-rate";
import styles from "../styles/pages/exchange-rate.module.scss";
import { Button, notification } from "antd";
import { useEffect, useState } from "react";
import useHttpGet from "../hooks/use-http-get";
import useHttpPatch from "../hooks/use-http-patch";

export default function RateExchange() {
  const [values, setValues] = useState({});
  const [showActionButton, setShowActionButton] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [currencies, setCurrencies] = useState([]);

  const { sendRequest } = useHttpGet();
  const { error, sendRequest: patchRequest } = useHttpPatch();

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

  return (
    <div>
      {contextHolder}
      <div className="page-title-container">
        <h1 className="page-title">Tasa de cambio</h1>
      </div>
      <div className={styles.currencies}>
        {currencies.map(
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
              patchRequest({
                url: "currencies",
                data: values,
                onSuccess: () => api.success({ message: "Cambios hecho." }),
                onError: () =>
                  api.error({
                    message: "Algo salió mal. Inttentelo más tarde",
                  }),
              });
              setShowActionButton(false);
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
