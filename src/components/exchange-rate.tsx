import styles from "./exchange-rate.module.scss";
import euro from "../assets/euro.svg";
import usd from "../assets/usd.svg";
import dop from "../assets/dop.svg";
import gbp from "../assets/gbp.svg";
import cad from "../assets/cad.svg";

export default function ExchangeRate(props: {
  id: number;
  icon: string;
  currencyCode: string;
  value: number;
  onChange: Function;
}) {
  const icons = { euro, usd, dop, gbp, cad };
  const { icon, currencyCode, value, id } = props;
  return (
    <div className={styles.exchangeRate}>
      <div className={styles.column}>
        <div className={styles.iconPlusCode}>
          <img src={icons[icon] as string} />
          <span>{currencyCode}</span>
        </div>
        <div className={styles.inputRead}>
          <div children={1} />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.iconPlusCode}>
          <img src={dop} />
          <span>DOP</span>
        </div>
        <div className={styles.inputValue}>
          <input
            min={1}
            onChange={({ target }) => {
              const value = Number(target.value);
              if (value < 1) {
                target.value = "1";
              }

              props.onChange(id, target.value);
            }}
            type="number"
            defaultValue={value}
            style={{
              fontSize: "24px",
              border: "none",
              borderRadius: "unset",
              backgroundColor: "#4f515a",
              outline: "none",
              color: "white",
              width: "96px",
              height: "40px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
