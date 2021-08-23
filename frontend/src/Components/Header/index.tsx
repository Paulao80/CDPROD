import './style.css';

type Props = {
    logo: string;
    titulo: string;
}

const Header = ({ logo, titulo }: Props) => {
    return (
        <header>
            <nav>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <h1>{titulo}</h1>
                </div>
            </nav>
        </header>
    );
}

export default Header;