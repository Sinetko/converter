import style from './Header.module.css'
import icon from '../../icons/logo.png'


const Header = () => {
    return (
        <header className={style.header} >
            <div>
                <img src={icon} />
            </div>
            <div>Converter</div>
        </header>
    )
}

export default Header;