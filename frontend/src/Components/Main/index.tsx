import './style.css';

interface MainProps {

}

const Main: React.FC<MainProps> = (props) => {
    return (
        <main>
            {props.children}
        </main>
    )

}

export default Main;