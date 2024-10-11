import Routes from "./Routes";
import "./Assets/css/app.css";
import {  combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import MenuReducer from "./Reducers/Menu";
import PageActiveReducer from "./Reducers/PageActive";
import NotificationReducer from "./Reducers/Notification";
import ModalStateReducer from "./Reducers/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const allReducers = combineReducers({
    MenuReducer,
    PageActiveReducer,
    NotificationReducer,
    ModalStateReducer,
  });

  const store = createStore(allReducers);

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes />
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
