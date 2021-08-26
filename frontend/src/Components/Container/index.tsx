import './style.css';

interface ContainerProps { }

const Container: React.FC<ContainerProps> = (props) => {
    return (
        <div className="container">
            {props.children}
        </div>
    )

}

export default Container;