import { Link } from 'react-router-dom';
import './style.css';
import { People, Edit, List, AccountBalance } from '@material-ui/icons';

type props = {
    to: string;
    type: string;
}

const ButtonAct = ({ to, type }: props) => {

    const GetIconType = (type: string) => {
        switch (type) {
            case "produtores":
                return (
                    <People fontSize="medium" />
                );
            case "editar":
                return (
                    <Edit fontSize="medium" />
                );
            case "detalhes":
                return (
                    <List fontSize="medium" />
                );
            case "contas":
                return (
                    <AccountBalance fontSize="medium" />
                );
        }
    }

    return (
        <Link className={`btn-act ${type}`} to={to}>
            {
                GetIconType(type)
            }
        </Link>
    );
}

export default ButtonAct;