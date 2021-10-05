import './style.css';
import { TextField } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Logo from '../../Assets/images/vaca.png';
import { FormEvent, useState } from 'react';
import { login } from '../../Services/Auth';

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

    return (
        <div className="container-full login-container">
            <div className="painel-login">
                <form onSubmit={onSubmit}>
                    <img src={Logo} alt="Logo" />
                    <h1>CDTR</h1>
                    <h2>LOGIN</h2>

                    <TextField
                        id="EmailOrUser"
                        name="EmailOrUser"
                        label="Usuário ou E-mail"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        value={EmailOrUser}
                        onChange={event => setEmailOrUser(event.target.value)}
                    />

                    <TextField
                        id="Password"
                        name="Password"
                        label="Senha"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        required
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