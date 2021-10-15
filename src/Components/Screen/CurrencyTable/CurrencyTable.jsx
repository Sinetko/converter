import style from './CurrencyTable.module.css'

const CurrencyTable = () => {
    return (
        <div className={style.currencyTable}>
            <div className={style.currencyTableItem} >Currency / Current Date</div>
            <div className={style.currencyTableItem} >Buy</div>
            <div className={style.currencyTableItem} >Sell</div>
            <div className={style.currencyTableItem} >USD / UAH</div>
            <div className={style.currencyTableItem} >27.5</div>
            <div className={style.currencyTableItem} >28.6</div>
            <div className={style.currencyTableItem} >EUR / UAH</div>
            <div className={style.currencyTableItem} >32.5</div>
            <div className={style.currencyTableItem} >32.7</div>
            <div className={style.currencyTableItem} >BTC / USD</div>
            <div className={style.currencyTableItem} >11500</div>
            <div className={style.currencyTableItem} >11700</div>
        </div>

    )
}

export default CurrencyTable;