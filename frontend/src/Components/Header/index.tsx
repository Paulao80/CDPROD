import './style.css';
import { Notifications, Menu } from '@material-ui/icons';

type Props = {
    logo: string;
    titulo: string;
    responsive: string;
    btnState: string;
    onHambClick: Function;
}

const Header = ({ logo, titulo, responsive, btnState, onHambClick }: Props) => {

    const logoClass = `logo ${responsive}`;
    const btnClass = `btn-header btn-menu-aside ${btnState}`;

    return (
        <header>
            <nav>
                <div id="logoNav" className={logoClass}>
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