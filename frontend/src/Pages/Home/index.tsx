import './style.css';
import Header from '../../Components/Header';
import logoImg from '../../Assets/images/logo.png';

const Home = () => {
    return (
        <>
            <Header logo={logoImg} titulo="CDTR" />
        </>
    );
}

export default Home;