import ExchangeRate from "../components/exchange-rate";
import styles from "../styles/pages/exchange-rate.module.scss";
import { Button, notification } from "antd";
import { useState } from "react";

export default function RateExchange() {
  const [values, setValues] = useState({});
  const [showActionButton, setShowActionButton] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleChange = (id: number, value: number) => {
    setValues({ ...values, [id]: value });
    setShowActionButton(true);
  };

  return (
    <div>
      {contextHolder}
      <div className="page-title-container">
        <h1 className="page-title">Tasa de cambio</h1>
      </div>
      <div className={styles.currencies}>
        {/* {data?.data.map(
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
        )} */}
      </div>
      {showActionButton && (
        <div className={styles.action}>
          <Button
            onClick={() => {
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
