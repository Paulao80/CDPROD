import './style.css';
import { Notifications, Menu } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { changeMenu } from '../../Actions/MenuActions';
import { StateMenu } from '../../Interfaces';

type Props = {
    logo: string;
    titulo: string;
}

interface Reducers {
    MenuReducer: StateMenu;
}

const Header = ({ logo, titulo }: Props) => {
    const history = useHistory();

    const MenuSelector = useSelector((state: Reducers) => {
        return state.MenuReducer;
    })

    const dispatch = useDispatch();

    const logoClass = `logo ${MenuSelector.aside}`;
    const btnClass = `btn-header btn-menu-aside ${MenuSelector.button}`;

    const OnLogoClick = () => {
        history.push("/");
    }

    return (
        <header>
            <nav>
                <div id="logoNav" className={logoClass} onClick={OnLogoClick}>
                    <img src={logo} alt="Logo" />
                    <h1>{titulo}</h1>
                </div>
                <button id="btnHamb" className={btnClass} onClick={() => dispatch(changeMenu())}><Menu fontSize="large" /></button>
                <button className="btn-header btn-notification"><Notifications fontSize="large" /></button>
            </nav>
        </header>
    );
}

export default Header;