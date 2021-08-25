import './style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faHome, faGlassWhiskey, faFileAlt } from '@fortawesome/free-solid-svg-icons';

type props = {
    UserImg: string;
    Active: string;
    responsive: string;
};

const Aside = ({ UserImg, Active, responsive }: props) => {

    let dashboard = "", produtor = "", propriedade = "", tanques = "", relatorio = "";

    switch (Active) {
        case "dashboard":
            dashboard = "active"
            break;

        case "produtor":
            produtor = "active";
            break;

        case "propriedade":
            propriedade = "active";
            break;

        case "tanque":
            tanques = "active";
            break;

        default:
            relatorio = "active";
            break;
    }

    return (
        <aside className={responsive}>
            <div className="user_info">
                <div className="user_image">
                    <img src={UserImg} alt="user Imagem" />
                </div>
                <h2>Anonimo</h2>
                <Link to="#">Sair</Link>
            </div>
            <div className="menu_lateral">
                <ul>
                    <li className={dashboard}>
                        <Link to="/">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={produtor}>
                        <Link to="/produtor">
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Produtores</span>
                        </Link>
                    </li>
                    <li className={propriedade}>
                        <Link to="/propriedade">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Propriedades</span>
                        </Link>
                    </li>
                    <li className={tanques}>
                        <Link to="/tanque">
                            <FontAwesomeIcon icon={faGlassWhiskey} />
                            <span>Tanques</span>
                        </Link>
                    </li>
                    <li className={relatorio}>
                        <Link to="/relatorios">
                            <FontAwesomeIcon icon={faFileAlt} />
                            <span>Relatórios</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Aside;