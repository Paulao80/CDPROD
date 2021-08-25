import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';

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
                <button id="btnHamb" className={btnClass} onClick={() => onHambClick()}><FontAwesomeIcon icon={faBars} /></button>
                <button className="btn-header btn-notification"><FontAwesomeIcon icon={faBell} /></button>
            </nav>
        </header>
    );
}

export default Header;