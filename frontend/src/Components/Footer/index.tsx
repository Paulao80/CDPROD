import './style.css';
import { Link } from 'react-router-dom';
import { PersonAdd } from '@mui/icons-material';

const Footer = () => {

    let DateNow = new Date();

    return (
        <footer>
            <Link to="/account/register"><PersonAdd /> <span>Registro</span></Link>
            <h3>©{DateNow.getFullYear()} - Paulo Vinicius Costa Nogueira</h3>

        </footer>
    );
}

export default Footer;