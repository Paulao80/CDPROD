import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';

type Props = {
    logo: string;
    titulo: string;
}

const Header = ({ logo, titulo }: Props) => {
    return (
        <header>
            <nav>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <h1>{titulo}</h1>
                </div>
                <button className="btn-header btn-bell"><FontAwesomeIcon icon={faBell} /></button>
                <button className="btn-header btn-bars"><FontAwesomeIcon icon={faBars} /></button>
            </nav>
        </header>
    );
}

export default Header;