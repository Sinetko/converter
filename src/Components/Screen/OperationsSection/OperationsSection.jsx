import style from "./OperationsSection.module.css";
import icon from "../../../icons/exchangeMoney.png";
import { useCallback, useEffect, useState } from "react";
import { converter } from "../../../math-operations/math-operations";

const OperationsSection = (props) => {
  const [changingValue, setChangingValue] = useState("");
  const [changingCurrency, setChangingCurrency] = useState("UAH");

  const [gettingValue, setGettingValue] = useState("");
  const [gettingCurrency, setGettingCurrency] = useState("USD");

  const setStateHandler = useCallback((e) => {
    if (e.target.name === "changingCurrency") {
      setChangingCurrency(e.target.value);
    } else if (e.target.name === "gettingCurrency") {
      setGettingCurrency(e.target.value);
    } else if (e.target.name === "changingValue") {
      setChangingValue(e.target.value);
    }
  }, []);

  const reverseValues = useCallback(() => {
    const tmp = changingCurrency;
    setChangingValue(gettingValue);
    setChangingCurrency(gettingCurrency);
    setGettingCurrency(tmp);
  }, [gettingCurrency, gettingValue, changingCurrency]);

  useEffect(() => {
    setGettingValue(converter(changingValue, changingCurrency, gettingCurrency, props.nationalCurrency, props.currencyData))
  }, [changingValue, gettingCurrency, changingCurrency, props.currencyData, props.nationalCurrency]);

  return (
    <div className={style.operationsSection}>
      <div className={style.operationsItem}>
        <div className={style.operationsItemForm}>
          <input
            type="number"
            placeholder="Change"
            onChange={setStateHandler}
            value={changingValue}
            name={"changingValue"}
          />
          <select
            onChange={setStateHandler}
            value={changingCurrency}
            name={"changingCurrency"}
          >
            <option value={props.nationalCurrency}>{props.nationalCurrency}</option>
            {/* currency list */}
            {props.currencyList}
          </select>
        </div>
      </div>
      <button onClick={reverseValues} className={style.operationsItem}>
        <img src={icon} alt={'çhange values'} />
      </button>
      <div className={style.operationsItem}>
        <div className={style.operationsItemForm}>
          <input type="number" placeholder="Get" value={gettingValue || ''} readOnly/>
          <select
            onChange={setStateHandler}
            value={gettingCurrency}
            name={"gettingCurrency"}
          >
            <option key={props.nationalCurrency} value={props.nationalCurrency}>{props.nationalCurrency}</option>
            {/* currency list */}
            {props.currencyList}
          </select>
        </div>
      </div>
    </div>
  );
};

export default OperationsSection;
