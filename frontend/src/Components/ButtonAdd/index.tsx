import './style.css';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';

type props = {
    to?: string;
    onClick?(): any; 
}

const ButtonAdd = ({ to, onClick }: props) => {
    return to ? (
        <Link className="btn-add" to={to}><Add fontSize="large" /></Link>
    ) : (
        <button onClick={onClick} className="btn-add"><Add fontSize="large" /></button>
    );
}

export default ButtonAdd;