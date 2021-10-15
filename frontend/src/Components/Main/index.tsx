import './style.css';
import Notification from '../Notification';

interface MainProps { }

const Main: React.FC<MainProps> = (props) => {
    return (
        <main>
            {props.children}
            <Notification />
        </main>
    )

}

export default Main;