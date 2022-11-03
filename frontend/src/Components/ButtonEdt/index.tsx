import './style.css';
import { Link } from 'react-router-dom';
import { Edit } from '@mui/icons-material';

type props = {
    to: string;
}

const ButtonEdt = ({ to }: props) => {
    return (
        <Link className="btn-edt" to={to}><Edit fontSize="large" /></Link>
    );
}

export default ButtonEdt;