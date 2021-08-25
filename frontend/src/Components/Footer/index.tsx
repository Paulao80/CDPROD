import './style.css';

const Footer = () => {

    let DateNow = new Date();

    return (
        <footer>
            <h3>©{DateNow.getFullYear()} - Paulo Vinicius Costa Nogueira</h3>
        </footer>
    );
}

export default Footer;