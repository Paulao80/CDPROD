import './style.css';
import { Link } from 'react-router-dom';
import { Dashboard, People, House, LocalDrink, FileCopy } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { StateMenu, StatePageActive } from '../../Interfaces';

type props = {
    UserImg: string;
};

interface Reducers {
    MenuReducer: StateMenu;
    PageActiveReducer: StatePageActive
}

const Aside = ({ UserImg }: props) => {

    const MenuSelector = useSelector((state: Reducers) => {
        return state.MenuReducer;
    });

    const PageSelector = useSelector((state: Reducers) => {
        return state.PageActiveReducer;
    });

    return (
        <aside className={MenuSelector.aside}>
            <div className="user_info">
                <div className="user_image">
                    <img src={UserImg} alt="user Imagem" />
                </div>
                <h2>Anonimo</h2>
                <Link to="#">Sair</Link>
            </div>
            <div className="menu_lateral">
                <ul>
                    <li className={PageSelector.Dashboard}>
                        <Link to="/dashboard">
                            {/* <FontAwesomeIcon icon={faTachometerAlt} /> */}
                            <Dashboard fontSize="large" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={PageSelector.Produtores}>
                        <Link to="/produtor">
                            {/* <FontAwesomeIcon icon={faUsers} /> */}
                            <People fontSize="large" />
                            <span>Produtores</span>
                        </Link>
                    </li>
                    <li className={PageSelector.Propriedades}>
                        <Link to="/propriedade">
                            {/* <FontAwesomeIcon icon={faHome} /> */}
                            <House fontSize="large" />
                            <span>Propriedades</span>
                        </Link>
                    </li>
                    <li className={PageSelector.Tanques}>
                        <Link to="/tanque">
                            {/* <FontAwesomeIcon icon={faGlassWhiskey} /> */}
                            <LocalDrink fontSize="large" />
                            <span>Tanques</span>
                        </Link>
                    </li>
                    <li className={PageSelector.Relatorios}>
                        <Link to="/relatorios">
                            {/* <FontAwesomeIcon icon={faFileAlt} /> */}
                            <FileCopy fontSize="large" />
                            <span>Relatórios</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Aside;