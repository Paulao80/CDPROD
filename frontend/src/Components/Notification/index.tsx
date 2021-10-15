import { useSelector } from 'react-redux';
import './style.css';

interface Reducers {
    NotificationReducer: string;
}

const Notification = () => {

    const MenuSelector = useSelector((state: Reducers) => {
        return state.NotificationReducer;
    });

    return (
        <div className={MenuSelector}>

        </div>
    );
}

export default Notification;