import style from './App.module.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Screen from '../Screen/Screen';

function App() {
  return (
    <div className={style.mainContentWrapper} >
      <Header />
      <Screen />
      <Footer />
    </div>
  );
}

export default App;
