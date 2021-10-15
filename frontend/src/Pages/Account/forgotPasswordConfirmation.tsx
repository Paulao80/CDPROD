import './style.css';
import Logo from '../../Assets/images/vaca.png';

const ForgotPasswordConfirmation = () => {
    return (
        <div className="container-full login-container">
            <div className="painel-login">

                <br />
                <br />
                <br />
                <br />
                <br />
                <img src={Logo} alt="Logo" />
                <h1>CDTR</h1>
                <br />
                <br />
                <h2>Esqueceu a Senha Confirmação</h2>
                <br />
                <h3>Por Favor verifique seu E-mail.</h3>

            </div>
        </div>
    );
}

export default ForgotPasswordConfirmation;