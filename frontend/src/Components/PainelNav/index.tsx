import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './style.css';

type props = {
    to: string;
    titulo: string;
}

const PainelNav = ({ to, titulo }: props) => {
    return (
        <div className="painel-nav">
            <Link to={to}><ArrowBackIcon fontSize="large" /></Link>
            <label className="lbl-title">{titulo}</label>
        </div>
    );
}

export default PainelNav;