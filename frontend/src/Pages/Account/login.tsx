import './style.css';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import Logo from '../../Assets/images/vaca.png';
import { FormEvent, useState } from 'react';
import { login, isAuthenticated } from '../../Services/Auth';

interface stateType {
    from: { pathname: string }
}

const Login = () => {
    const history = useHistory();
    const location = useLocation<stateType>();

    const [EmailOrUser, setEmailOrUser] = useState("");
    const [Password, setPassword] = useState("");

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        login(EmailOrUser, Password).then((response) => {
            if (response !== false) {
                const { from } = location.state || { from: { pathname: "/" } };
                history.replace(from);
            }
            else {
                console.log(response);
            }
        });
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
                            placeholder="Usuário ou E-mail *"
                            required={true}
                            value={EmailOrUser}
                            onChange={event => setEmailOrUser(event.target.value)}
                        />

                        <input
                            className="input-account"
                            type="password"
                            id="Password"
                            name="Password"
                            placeholder="Senha *"
                            required={true}
                            value={Password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <Link to="/account/forgot-password">Esqueceu a Senha?</Link>

                        <button type="submit">Logar</button>
                    </form>

                </div>
            </div>
        );
}

export default Login;