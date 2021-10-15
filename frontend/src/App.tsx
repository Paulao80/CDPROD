import Routes from './Routes';
import './Assets/css/app.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import MenuReducer from './Reducers/Menu';
import PageActiveReducer from './Reducers/PageActive';
import NotificationReducer from './Reducers/Notification';

function App() {
  const allReducers = combineReducers({
    MenuReducer,
    PageActiveReducer,
    NotificationReducer
  });

  const store = createStore(allReducers);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
