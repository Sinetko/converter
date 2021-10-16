import style from './OperationsSection.module.css'
import icon from '../../../icons/exchangeMoney.png'
import { useRef } from 'react'
import { useState } from 'react';

const OperationsSection = () => {

    const [gettingValue, setGettingValue] = useState('');
    const [saleCurrency, setSaleCurrency] = useState('EUR')

    let changeInput = useRef();
    let changeInputSelector = useRef();
    let getInputSelector = useRef();

    // let gettingCategory
    // if (saleCurrency === 'EUR' || saleCurrency === 'USD' || saleCurrency === 'RUR') {
    //     gettingCategory = <option>UAH</option>
    // } else if (saleCurrency === 'BTC') {
    //     gettingCategory = <option>USD</option>
    // }

return (
    <div className={style.operationsSection} >
        <div className={style.operationsItem} >
            {/* <div className={style.operationType} >Change</div> */}
            <div className={style.operationsItemForm}>
                <input type='number' ref={changeInput} placeholder='Change'/>
                <select ref={changeInputSelector} >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>RUR</option>
                    <option>BTC</option>
                </select>
            </div>
        </div>
        <button >
            <img src={icon} />
        </button>
        <div className={style.operationsItem} >
            {/* <div className={style.operationType} >Get</div> */}
            <div className={style.operationsItemForm} >
                <input type='number' value={gettingValue} placeholder='Get'/>
                <select ref={getInputSelector} >
                    {/* {gettingCategory} */}
                </select>
            </div>
        </div>
    </div>

)
}

export default OperationsSection;