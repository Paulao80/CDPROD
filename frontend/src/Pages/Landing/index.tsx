import './style.css';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/images/vaca.png';
import Coleta from '../../Assets/images/coleta.png';
import { ArrowForward } from '@mui/icons-material';

const Landing = () => {
    return (
        <div className="container-full landing">
            <div className="ld-info">
                <div className="logo-ld">
                    <img src={Logo} alt="logo" />
                    <h1>CDTR</h1>
                </div>
                <h2>Bem-vindo</h2>
                <p>Sistema de Coleta de dados de Produtores de Leite</p>
            </div>
            <div className="ld-show">
                <img src={Coleta} alt="Coleta" />
                <Link to="/dashboard">
                    <ArrowForward fontSize="large" />
                </Link>
            </div>
        </div>
    );
}

export default Landing;