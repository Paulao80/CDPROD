import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeMenu, hideMenu } from "../../Actions/MenuActions";
import {
  changeNotification,
  hideNotification,
} from "../../Actions/NotificationActions";
import { StateMenu } from "../../Interfaces";
import { Menu, Notifications } from "@mui/icons-material";

type Props = {
  logo: string;
  titulo: string;
};

interface Reducers {
  MenuReducer: StateMenu;
}

const Header = ({ logo, titulo }: Props) => {
  const navigate = useNavigate();

  const MenuSelector = useSelector((state: Reducers) => {
    return state.MenuReducer;
  });

  const dispatch = useDispatch();

  const logoClass = `logo ${MenuSelector.aside}`;
  const btnClass = `btn-header btn-menu-aside ${MenuSelector.button}`;

  const OnLogoClick = () => {
    navigate("/");
  };

  return (
    <header>
      <nav>
        <div id="logoNav" className={logoClass} onClick={OnLogoClick}>
          <img src={logo} alt="Logo" />
          <h1>{titulo}</h1>
        </div>
        <button
          id="btnHamb"
          className={btnClass}
          onClick={() => {
            dispatch(changeMenu());
            dispatch(hideNotification());
          }}
        >
          <Menu fontSize="large" />
        </button>

        <button
          onClick={() => {
            dispatch(changeNotification());
            dispatch(hideMenu());
          }}
          className="btn-header btn-notification"
        >
          <Notifications fontSize="large" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
