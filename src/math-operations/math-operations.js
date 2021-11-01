export const converter = (
  changingValue,
  changingCurrency,
  gettingCurrency,
  nationalCurrency,
  currencyData
) => {
  if (changingCurrency === gettingCurrency) {
    return changingValue;

  } else if (
    changingCurrency === nationalCurrency &&
    gettingCurrency !== nationalCurrency
  ) {

    //----converting national currency to other
    const convertationCurrency = currencyData.find((item) => {
      return item.base_ccy === changingCurrency && item.ccy === gettingCurrency;
    });

    if (convertationCurrency) {
      return (
        Math.floor((changingValue / convertationCurrency.sale) * 100) / 100
      );
    }

  } else if (
    changingCurrency !== nationalCurrency &&
    gettingCurrency === nationalCurrency
  ) {
    //----converting other currency to national
    const convertationCurrency = currencyData.find((item) => {
      return item.ccy === changingCurrency && item.base_ccy === gettingCurrency;
    });
    
    if (convertationCurrency) {
      return Math.floor(changingValue * convertationCurrency.buy * 100) / 100;
    }
    
  } else if (
    changingCurrency !== nationalCurrency &&
    gettingCurrency !== nationalCurrency
  ) {
    //----converting different currencies (not national)

    //(find arrays without national currency)
    const withoutDoubleConvertation = currencyData.filter(
      (item) => item.doubleConvertation === false
    );
 
    if (withoutDoubleConvertation.length >= 1) {

      // check objects without double convertation
      let convertationCurrency = currencyData.find((item) => {
        return (
          item.base_ccy === changingCurrency && item.ccy === gettingCurrency
        );
      });

      //return if find it
      if (convertationCurrency) {
        return (
          Math.floor((changingValue / convertationCurrency.sale) * 100) / 100
        );
      }

      //check objects without double convertation
      convertationCurrency = currencyData.find((item) => {
        return (
          item.ccy === changingCurrency && item.base_ccy === gettingCurrency
        );
      });

      //return if find it
      if (convertationCurrency) {
        return Math.floor(changingValue * convertationCurrency.buy * 100) / 100;
      }

      //else looking for object with national currency
      const tempValue = currencyData.find((item) => {
        return (
          item.ccy === changingCurrency && item.base_ccy === nationalCurrency
        );
      });

      //converting to national currency
      const tmp = changingValue * tempValue.buy;

      //looking for object to convert in getting currency
      convertationCurrency = currencyData.find((item) => {
        return (
          item.ccy === gettingCurrency && item.base_ccy === nationalCurrency
        );
      });

      if (convertationCurrency) {
        return Math.floor((tmp / convertationCurrency.sale) * 100) / 100;
      }
    }
  }
};
