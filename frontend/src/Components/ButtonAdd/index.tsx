import './style.css';
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';

type props = {
    to: string;
}

const ButtonAdd = ({ to }: props) => {
    return (
        <Link className="btn-add" to={to}><Add fontSize="large" /></Link>
    );
}

export default ButtonAdd;