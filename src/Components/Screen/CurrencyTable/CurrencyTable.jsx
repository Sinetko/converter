import { useEffect } from 'react'
import { connect } from 'react-redux'
import style from './CurrencyTable.module.css'
import { getCurrencyData } from '../../../redux/mainPage-reducer'

const CurrencyTable = (props) => {

    useEffect(() => {
        props.getCurrencyData()
    }, [])

    console.log(props.currencyData)

    return (
        <table className={style.currencyTable}>
            <tr>
                <th className={style.currencyTableItem}> Currency / Currency Data</th>
                <th className={style.currencyTableItem}> Buy</th>
                <th className={style.currencyTableItem}> Sell</th>
            </tr>
            {props.currencyData.map((item) => {
                return <tr key={item.currency}  >
                    <td className={style.currencyTableItem}>{item.currency}</td>
                    <td className={style.currencyTableItem}>{item.buy}</td>
                    <td className={style.currencyTableItem}>{item.sale}</td>
                </tr>
            })}
        </table>

    )
}
const mapStateToProps = (state) => {
    return {
        currencyData: state.mainPage.currencyData,
    }
}

export default
    connect(mapStateToProps, { getCurrencyData }
    )(CurrencyTable);