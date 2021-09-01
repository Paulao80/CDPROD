import './style.css';
import { Notifications, Menu } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

type Props = {
    logo: string;
    titulo: string;
    responsive: string;
    btnState: string;
    onHambClick: Function;
}

const Header = ({ logo, titulo, responsive, btnState, onHambClick }: Props) => {
    const history = useHistory();

    const logoClass = `logo ${responsive}`;
    const btnClass = `btn-header btn-menu-aside ${btnState}`;

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
                <button id="btnHamb" className={btnClass} onClick={() => onHambClick()}><Menu fontSize="large" /></button>
                <button className="btn-header btn-notification"><Notifications fontSize="large" /></button>
            </nav>
        </header>
    );
}

export default Header;