import style from "./Screen.module.css";
import CurrencyTable from "./CurrencyTable/CurrencyTable";
import OperationsSection from "./OperationsSection/OperationsSection";
import { getCurrencyData } from "../../redux/mainPage-reducer";
import { useEffect, useMemo } from "react";
import { connect } from "react-redux";

const Screen = ({getCurrencyData, ...props}) => {

  useEffect(() => {
    getCurrencyData();
  }, [getCurrencyData]);

  const currencyDataArray = useMemo(() => {
    
    const currencyData = props.currencyData.reduce((acc, item) => {
      if (item.base_ccy === props.nationalCurrency) {
        return [
          ...acc,
          {
            ccy: item.ccy,
            base_ccy: item.base_ccy,
            buy: item.buy,
            sale: item.sale,
          },
        ];

      } else {
        const specialCurrencyData = props.currencyData.find((item2) => {
          return (
            item.base_ccy === item2.ccy &&
            item2.base_ccy === props.nationalCurrency
          );
        });

        if (specialCurrencyData) {
          return [
            ...acc,
            {
              ccy: item.ccy,
              base_ccy: item.base_ccy,
              buy: item.buy,
              sale: item.sale,
              doubleConvertation: false,
            },
            {
              ccy: item.ccy,
              base_ccy: specialCurrencyData.base_ccy,
              buy: item.buy * specialCurrencyData.buy,
              sale: item.sale * specialCurrencyData.sale,
            },
          ];

        } else {
          return [
            ...acc,
            {
              ccy: item.ccy,
              base_ccy: item.base_ccy,
              buy: item.buy,
              sale: item.sale,
            },
          ];
        }
      }
    }, []);

    return currencyData;
  }, [props.currencyData, props.nationalCurrency]);

  const currencyList = props.currencyData.map((el) => (
    <option key={el.ccy} value={el.ccy}>
      {el.ccy}
    </option>
  ));

  return (
    <div className={style.screen}>
      <CurrencyTable currencyData={props.currencyData} />

      <OperationsSection
        nationalCurrency={props.nationalCurrency}
        currencyData={currencyDataArray}
        currencyList={currencyList}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currencyData: state.mainPage.currencyData,
    nationalCurrency: state.mainPage.nationalCurrency,
  };
};

export default connect(mapStateToProps, { getCurrencyData })(Screen);
