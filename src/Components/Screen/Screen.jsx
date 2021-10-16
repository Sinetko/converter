import style from './Screen.module.css'
import icon from '../../icons/exchangeMoney.png'
import CurrencyTable from './CurrencyTable/CurrencyTable';
import OperationsSection from './OperationsSection/OperationsSection';


const Screen = () => {
    return (
        <div className={style.screen} >
            
            <CurrencyTable />
            <OperationsSection />
        </div>
    )
}

export default Screen;