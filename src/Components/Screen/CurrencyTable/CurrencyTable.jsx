import style from "./CurrencyTable.module.css";

const CurrencyTable = (props) => {
  
  const currencyData = props.currencyData.reduce((acc, item) => {
    return [
      ...acc,
      {
        currency: `${item.base_ccy} / ${item.ccy}`,
        buy: Math.floor(item.buy * 100) / 100,
        sale: Math.floor(item.sale * 100) / 100,
      },
    ];
  }, []);

  return (
    <table className={style.currencyTable}>
      <tbody>
      <tr>
        <th className={style.currencyTableItem}> Currency / Currency Data</th>
        <th className={style.currencyTableItem}> Buy</th>
        <th className={style.currencyTableItem}> Sell</th>
      </tr>
      {currencyData.map((item) => {
        return (
          <tr key={item.currency}>
            <td className={style.currencyTableItem}>{item.currency}</td>
            <td className={style.currencyTableItem}>{item.buy}</td>
            <td className={style.currencyTableItem}>{item.sale}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
