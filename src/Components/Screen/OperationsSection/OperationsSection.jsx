import style from './OperationsSection.module.css'
import icon from '../../../icons/exchangeMoney.png'
import { useCallback, useEffect, useState } from 'react';

const OperationsSection = (props) => {
    
    const [changingValue, setChangingValue] = useState('');
    const [changingCurrency, setChangingCurrency] = useState('UAH');

    const [gettingValue, setGettingValue] = useState('');
    const [gettingCurrency, setGettingCurrency] = useState('USD');

    // const setStateHandler = (e) => {
    //     const value = e.target.value
    //     if (e.target.name === 'changingCurrency') {
    //         setChangingCurrency(value)
    //     } else if (e.target.name === 'gettingCurrency') {
    //         setGettingCurrency(value)
    //     } else if (e.target.name === 'changingValue') {
    //         setChangingValue(value)
    //     }
    // }

    const setStateHandler = useCallback((e) => {
        if (e.target.name === 'changingCurrency') {
            setChangingCurrency(e.target.value)
        } else if (e.target.name === 'gettingCurrency') {
            setGettingCurrency(e.target.value)
        } else if (e.target.name === 'changingValue') {
            setChangingValue(e.target.value)
        }
    },[])

    const reverseValues = useCallback(()=>{
        const tmp = changingCurrency
        setChangingValue(gettingValue);
        setChangingCurrency(gettingCurrency)
        setGettingCurrency(tmp)
    },[gettingCurrency,gettingValue, changingCurrency])

    // const reverseValues = () => {
    //     const tmp = changingCurrency
    //     setChangingValue(gettingValue);
    //     setChangingCurrency(gettingCurrency)
    //     setGettingCurrency(currentCurrency)
    // }

    //props.nationalCurrency = 'UAH'
    const convertValue = () => {

        let result 

        if (changingCurrency === gettingCurrency) {
            //одинаковые валюты
            result = changingValue;
            setGettingValue(result)
        } else if (changingCurrency === props.nationalCurrency && gettingCurrency !== props.nationalCurrency) {
            //переводим грн в иностранную валюту
            props.currencyData.forEach((item) => {
                if (item.base_ccy === changingCurrency && item.ccy === gettingCurrency) { //uah
                    result = Math.floor(changingValue / item.sale * 100) / 100 //(if gettingCurrency === usd)
                    setGettingValue(result)
                }
            })
        } else if (changingCurrency !== props.nationalCurrency && gettingCurrency === props.nationalCurrency) {
            //переводим иностранную валюту в грн
            props.currencyData.forEach((item) => {
                if (item.ccy === changingCurrency && item.base_ccy === gettingCurrency) { //usd
                    result = Math.floor(changingValue * item.buy * 100) / 100 //(if gettingCurrency === usd)
                    setGettingValue(result)
                }
            })
        } else if (changingCurrency !== props.nationalCurrency && gettingCurrency !== props.nationalCurrency) {
            let uniqieTemp = props.currencyData.filter(item => item.doubleConvertation === false );
            if (uniqieTemp.length >= 1) {
                uniqieTemp.forEach((item) => {
                    if (item.base_ccy === changingCurrency && item.ccy === gettingCurrency) { //usd
                        result = Math.floor(changingValue / item.sale * 100) / 100 //btc
                        setGettingValue(result)
                    } else if (item.ccy === changingCurrency && item.base_ccy === gettingCurrency) { //btc
                        result = Math.floor(changingValue * item.buy * 100) / 100 //(if gettingCurrency === usd)
                        setGettingValue(result)
                    } else {
                        props.currencyData.forEach((item) => {
                            if (item.ccy === changingCurrency && item.base_ccy === props.nationalCurrency) {
                                let tempValue = changingValue * item.buy // (if gettingCurrency === eur -  convert to uah)
                                props.currencyData.forEach((item2) => {
                                    if (item2.ccy === gettingCurrency) {
                                        result = Math.floor(tempValue / item2.sale * 100) / 100
                                        setGettingValue(result)
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                props.currencyData.forEach((item) => {
                    if (item.ccy === changingCurrency && item.base_ccy !== gettingCurrency) {
                        let tempValue = changingValue * item.buy // (if gettingCurrency === eur -  convert to uah)
                        props.currencyData.forEach((item2) => {
                            if (item2.ccy === gettingCurrency) {
                                result = Math.floor(tempValue / item2.sale * 100) / 100
                                setGettingValue(result)
                            }
                        })
                    }
                })
            }
        }

    }


    {
        // const [convertation, setConvertation] = useState(true);

        // const convertValue = () => {
        //     debugger
        //     let result //результат
        //     let value = changingValue
        //     let data = props.currencyData
        //     let changingCurrency = changingCurrency//продаваемая валюта
        //     let gettingCurrency = gettingCurrency//покупаемая валюта
        //     let tempValue //национальная валюта
        //     let value3
        //     if (changingCurrency === gettingCurrency) {
        //         result = changingCurrency;
        //         setConvertation(false)
        //     }
        //     else if (result === undefined) {
        //         data.forEach((item) => {
        //             if (item.base_ccy === changingCurrency && item.ccy === gettingCurrency) {
        //                 result =
        //                     Math.floor(value / item.sale * 100) / 100 //(if gettingCurrency === usd)
        //                 setGettingValue(result)

        //             }
        //         })
        //         setConvertation(false)
        //     }
        //     else if (result === undefined) {
        //         data.forEach((item) => {
        //             if (item.base_ccy === changingCurrency && item.ccy === gettingCurrency) { //uah
        //                 result = Math.floor(value / item.sale * 100) / 100 //(if gettingCurrency === usd)
        //                 setGettingValue(result)
        //             }
        //         })
        //         setConvertation(false)
        //     }
        //     else if (result === undefined) {
        //         data.forEach((item) => {
        //             if (item.ccy === changingCurrency && item.base_ccy === gettingCurrency) {
        //                 result = Math.floor(value * item.buy * 100) / 100 //  (if gettingCurrency === uah)
        //                 setGettingValue(result)
        //             }
        //         })
        //         setConvertation(false)
        //     }
        //     else if (result === undefined) {
        //         data.forEach((item) => {
        //             if (item.ccy === changingCurrency && item.base_ccy !== gettingCurrency) {
        //                 tempValue = value * item.buy // (if gettingCurrency === eur -  convert to uah)
        //                 data.forEach((item2) => {
        //                     if (item2.ccy === gettingCurrency) {
        //                         result = Math.floor(tempValue / item2.sale * 100) / 100
        //                         setGettingValue(result)
        //                     }
        //                 })
        //             }
        //         })
        //         setConvertation(false)
        //         // convertation = false;
        //     }
        //     setConvertation(true)

        // }





        // const convertValue = () => {


        //     let result //результат
        //     let value = changingValue
        //     let data = props.currencyData
        //     let changingCurrency = changingCurrency//продаваемая валюта
        //     let gettingCurrency = gettingCurrency//покупаемая валюта
        //     let tempValue //национальная валюта
        //     let value3

        //     if (convertation) {
        //         data.forEach((item) => {
        //             if (changingCurrency === gettingCurrency) {
        //                 setGettingValue(value)

        //             } else if (item.base_ccy === changingCurrency && item.ccy === gettingCurrency) {
        //                 result =
        //                     Math.floor(value / item.sale * 100) / 100 //(if gettingCurrency === usd)
        //                 setGettingValue(result)

        //             }
        //         })
        // setConvertation(false)
        //         // convertation = false;
        //         return
        //     }
        //     if (convertation) {
        //         data.forEach((item) => {
        //             if (item.base_ccy === changingCurrency && item.ccy === gettingCurrency) { //uah
        //                 result = Math.floor(value / item.sale * 100) / 100 //(if gettingCurrency === usd)
        //                 setGettingValue(result)
        //             }
        //         })
        // setConvertation(false)
        //         // convertation = false;
        //         return
        //     }
        //     if (convertation) {
        //         data.forEach((item) => {
        //             if (item.ccy === changingCurrency && item.base_ccy === gettingCurrency) {
        //                 result = Math.floor(value * item.buy * 100) / 100 //  (if gettingCurrency === uah)
        //                 setGettingValue(result)
        //             }
        //         })
        // setConvertation(false)
        //         // convertation = false;
        //         return
        //     }
        //     if (convertation) {
        //         data.forEach((item) => {
        //             if (item.ccy === changingCurrency && item.base_ccy !== gettingCurrency) {
        //                 tempValue = value * item.buy // (if gettingCurrency === eur -  convert to uah)
        //                 data.forEach((item2) => {
        //                     if (item2.ccy === gettingCurrency) {
        //                         result = Math.floor(tempValue / item2.sale * 100) / 100
        //                         setGettingValue(result)
        //                     }
        //                 })
        //             }
        //         })
        // setConvertation(false)
        //         // convertation = false;
        //         return
        //     }
        //     // convertation = true;

        // }

        // const convertValue = () => {
        //     debugger
        //     let result //результат
        //     let value = changingValue

        //     let changingCurrency = changingCurrency//продаваемая валюта
        //     let gettingCurrency = gettingCurrency//покупаемая валюта
        //     let tempValue //национальная валюта

        //     for (let i = 0; i < props.currencyData.length; i++) {
        //         const item = props.currencyData[i];
        //         if (changingCurrency === gettingCurrency) {
        //             setGettingValue(value)
        //             break
        //         }
        //         //конвертация из национальной валюты
        //         if (item.base_ccy === changingCurrency) { //uah
        //             if (item.ccy === gettingCurrency) {
        //                 result = Math.floor(value / item.sale * 100) / 100 //(if gettingCurrency === usd)
        //                 setGettingValue(result)
        //                 break
        //             }
        //         }

        //         if (item.ccy === changingCurrency) { //usd
        //             //конвертация в национальную валюту
        //             if (item.base_ccy === gettingCurrency) {
        //                 result = Math.floor(value * item.buy * 100) / 100 //  (if gettingCurrency === uah)
        //                 setGettingValue(result)
        //                 break
        //             } else {
        //                 //сохранение в переменной результата конвертации в нац валюту
        //                 tempValue = Math.floor(value * item.buy * 100) / 100 // (if gettingCurrency === eur -  convert to uah)
        //                 //поиск нужной валюты среди ccy
        //                 for (let i = 0; i < props.currencyData.length; i++) {
        //                     const item = props.currencyData[i];
        //                     if (item.ccy === gettingCurrency) {
        //                         result = Math.floor(tempValue / item.sale * 100) / 100
        //                         setGettingValue(result);
        //                         break
        //                     }
        //                 }
        //                 break
        //             }
        //         }
        //     }

        // props.currencyData.forEach((item) => {
        //     let resultCreated = false;
        //     //одинаковые валюты
        //     do {
        //         if (changingCurrency === gettingCurrency) {
        //             setGettingValue(value)
        //             break
        //         }
        //         //конвертация из национальной валюты
        //         if (item.base_ccy === changingCurrency) { //uah
        //             if (item.ccy === gettingCurrency) {
        //                 result = Math.floor(value / item.sale * 100) / 100 //(if gettingCurrency === usd)
        //                 setGettingValue(result)
        //                 break
        //             }
        //         }

        //         if (item.ccy === changingCurrency) { //usd
        //             //конвертация в национальную валюту
        //             if (item.base_ccy === gettingCurrency) {
        //                 result = Math.floor(value * item.buy * 100) / 100 //  (if gettingCurrency === uah)
        //                 setGettingValue(result)
        //                 break
        //             } else {
        //                 //сохранение в переменной результата конвертации в нац валюту
        //                 tempValue = Math.floor(value * item.buy * 100) / 100 // (if gettingCurrency === eur -  convert to uah)
        //                 //поиск нужной валюты среди ccy
        //                 props.currencyData.forEach((item) => {
        //                     if (item.ccy === gettingCurrency) {
        //                         result = Math.floor(tempValue / item.sale * 100) / 100
        //                         setGettingValue(result);
        //                         break
        //                     }

        //                 })

        //             }
        //         }
        //     }while(!resultCreated)
        // })
        // }
    }
    useEffect(() => {
        convertValue()
    }, [changingValue, gettingCurrency, changingCurrency])

    return (
        <div className={style.operationsSection} >
            <div className={style.operationsItem} >
                <div className={style.operationsItemForm}>
                    <input type='number' placeholder='Change'
                        onChange={setStateHandler} value={changingValue} name={'changingValue'} />
                    <select onChange={setStateHandler} 
                    value={changingCurrency}
                     name={'changingCurrency'} >
                        <option value={'UAH'} >UAH</option>
                        <option value={'USD'} >USD</option>
                        <option value={'EUR'} >EUR</option>
                        <option value={'RUR'} >RUR</option>
                        <option value={'BTC'} >BTC</option>
                    </select>
                </div>
            </div>
            <button onClick={reverseValues} className={style.operationsItem}  >
                <img src={icon} />
            </button>
            <div className={style.operationsItem} >
                <div className={style.operationsItemForm} >
                    <input type='number' placeholder='Get' value={gettingValue} />
                    <select onChange={setStateHandler} 
                    value={gettingCurrency} 
                    name={'gettingCurrency'} >
                        <option value={'UAH'} >UAH</option>
                        <option value={'USD'} >USD</option>
                        <option value={'EUR'} >EUR</option>
                        <option value={'RUR'} >RUR</option>
                        <option value={'BTC'} >BTC</option>
                    </select>
                </div>
            </div>
        </div>

    )
}

export default OperationsSection;