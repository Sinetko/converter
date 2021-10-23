import style from './Screen.module.css'
import CurrencyTable from './CurrencyTable/CurrencyTable';
import OperationsSection from './OperationsSection/OperationsSection';
import { getCurrencyData } from '../../redux/mainPage-reducer'
import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

const Screen = (props) => {
    
    useEffect(() => {
        props.getCurrencyData()
    }, [])

    const currencyData = useMemo(()=>{
        const tmp =[]
        props.currencyData.forEach((item) => {
            if(item.base_ccy !== props.nationalCurrency){
                tmp.push({
                    'ccy': item.ccy,
                    'base_ccy': item.base_ccy,
                    'buy': item.buy,
                    'sale': item.sale,
                    'doubleConvertation': false,
                })
                props.currencyData.forEach((item2)=>{
                    if(item.base_ccy === item2.ccy && item2.base_ccy === props.nationalCurrency){
                        tmp.push({
                            'ccy': item.ccy,
                            'base_ccy': item2.base_ccy,
                            'buy': item.buy*item2.buy,
                            'sale': item.sale*item2.sale,
                        })
                    }
                })
            }else{
                tmp.push(item)
            }
            
        })
        return tmp
    }, [props.currencyData])

    // const currencyData = []
    // props.currencyData.forEach((item) => {
    //     if(item.base_ccy !== props.nationalCurrency){
    //         currencyData.push({
    //             'ccy': item.ccy,
    //             'base_ccy': item.base_ccy,
    //             'buy': item.buy,
    //             'sale': item.sale,
    //             'doubleConvertation': false,
    //         })
    //         props.currencyData.forEach((item2)=>{
    //             if(item.base_ccy === item2.ccy && item2.base_ccy === props.nationalCurrency){
    //                 currencyData.push({
    //                     'ccy': item.ccy,
    //                     'base_ccy': item2.base_ccy,
    //                     'buy': item.buy*item2.buy,
    //                     'sale': item.sale*item2.sale,
    //                 })
    //             }
    //         })
    //     }else{
    //         currencyData.push(item)
    //     }
        
    // })

    return (
        <div className={style.screen} >
            
            <CurrencyTable 
                currencyData={props.currencyData} 
            />
            <OperationsSection 
                nationalCurrency={props.nationalCurrency}
                currencyData={currencyData}  
            />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        currencyData: state.mainPage.currencyData,
        nationalCurrency: state.mainPage.nationalCurrency,
    }
}

export default
connect(
    mapStateToProps, 
    { getCurrencyData }
)(Screen);