import style from './OperationsSection.module.css'
import icon from '../../../icons/exchangeMoney.png'

const OperationsSection = () => {
    return (
        <div className={style.operationsSection} >
            <div className={style.operationsItem} >
                <div>Change</div>
                <div className={style.operationsItemForm}>
                    <input type='number' />
                    <select>
                        <option>UAH</option>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>BTC</option>
                    </select>
                </div>
            </div>
            <button>
                <img src={icon} />
            </button>
            <div className={style.operationsItem} >
                <div>Get</div>
                <div className={style.operationsItemForm} >
                    <input type='number' />
                    <select>
                        <option>UAH</option>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>BTC</option>
                    </select>
                </div>
            </div>
        </div>

    )
}

export default OperationsSection;