import './style.css';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import Logo from '../../Assets/images/vaca.png';
import { FormEvent, useState } from 'react';
import { login, isAuthenticated } from '../../Services/Auth';
import loading from '../../Assets/images/loading.gif';

interface stateType {
    from: { pathname: string }
}

const Login = () => {
    const history = useHistory();
    const location = useLocation<stateType>();

    const [EmailOrUser, setEmailOrUser] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const [Loading, setLoading] = useState(false);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);

        await login(EmailOrUser, Password)
            .then((response) => {
                if (response.status === 200) {
                    const { from } = location.state || { from: { pathname: "/dashboard" } };
                    history.replace(from);
                }
                else {
                    setErrorMessage(response.data.Message);
                }
            });

        setLoading(false);
    }

    return isAuthenticated()
        ? (<Redirect
            to={{
                pathname: "/dashboard",
                state: { from: location }
            }}>
        </Redirect>)
        : (
            <div className="container-full login-container">
                <div className="painel-login">
                    <form onSubmit={onSubmit}>
                        <img src={Logo} alt="Logo" />
                        <h1>CDTR</h1>
                        <h2>LOGIN</h2>

                        <input
                            className="input-account"
                            type="text"
                            id="EmailOrUser"
                            name="EmailOrUser"
                            placeholder="Usuário ou E-mail"
                            required={true}
                            value={EmailOrUser}
                            onChange={event => setEmailOrUser(event.target.value)}
                        />

                        <input
                            className="input-account"
                            type="password"
                            id="Password"
                            name="Password"
                            placeholder="Senha"
                            required={true}
                            value={Password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <div className="Message-error">
                            <p>{ErrorMessage}</p>
                        </div>

                        <Link to="/account/forgot-password">Esqueceu a Senha?</Link>

                        <button type="submit">
                            {
                                Loading ? (<img src={loading} alt="Loading" />) : "Login"
                            }
                        </button>
                    </form>

                </div>
            </div>
        );
}

export default Login;