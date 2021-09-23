import './style.css';

interface ContainerProps { }

const Container2: React.FC<ContainerProps> = (props) => {
    return (
        <div className="container2">
            {props.children}
        </div>
    )

}

export default Container2;