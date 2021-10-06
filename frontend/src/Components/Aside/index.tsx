import './style.css';
import { Link } from 'react-router-dom';
import { Dashboard, People, House, LocalDrink, FileCopy } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { StateMenu, StatePageActive } from '../../Interfaces';
import { logout } from '../../Services/Auth';
import { useEffect, useState } from 'react';
import { getUser } from '../../Services/Auth';
import { User } from '../../Interfaces';
import userImg from '../../Assets/images/anonimos.jpg';

interface Reducers {
    MenuReducer: StateMenu;
    PageActiveReducer: StatePageActive
}

const Aside = () => {

    const [user, setUser] = useState<User>();

    const MenuSelector = useSelector((state: Reducers) => {
        return state.MenuReducer;
    });

    const PageSelector = useSelector((state: Reducers) => {
        return state.PageActiveReducer;
    });

    useEffect(() => {
        const user = getUser();
        if (user) setUser(user);
    }, []);

    return (
        <aside className={MenuSelector.aside}>
            <div className="user_info">
                <div className="user_image">
                    <img src={user ? user.FotoPath : userImg} alt="user Imagem" />
                </div>
                <h2>{user ? user.Name : ""}</h2>
                <Link to="#" onClick={() => logout()}>Sair</Link>
            </div>
            <div className="menu_lateral">
                <ul>
                    <li className={PageSelector.Dashboard}>
                        <Link to="/dashboard">
                            <Dashboard fontSize="large" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={PageSelector.Produtores}>
                        <Link to="/produtor">
                            <People fontSize="large" />
                            <span>Produtores</span>
                        </Link>
                    </li>
                    <li className={PageSelector.Propriedades}>
                        <Link to="/propriedade">
                            <House fontSize="large" />
                            <span>Propriedades</span>
                        </Link>
                    </li>
                    <li className={PageSelector.Tanques}>
                        <Link to="/tanque">
                            <LocalDrink fontSize="large" />
                            <span>Tanques</span>
                        </Link>
                    </li>
                    <li className={PageSelector.Relatorios}>
                        <Link to="/relatorios">
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