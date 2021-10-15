import './style.css';
import Logo from '../../Assets/images/vaca.png';
import { FormEvent, useState } from 'react';
import loading from '../../Assets/images/loading.gif';
import { useHistory, useLocation } from 'react-router-dom';
import Api from '../../Services/Api';

interface Error {
    message: string;
    errors: {
        Token: string[];
        Password: string[];
        PasswordConfirmation: string[];
    };
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
    const history = useHistory();
    const query = useQuery();

    const [Loading, setLoading] = useState(false);
    const [Password, setPassword] = useState<string>("");
    const [PasswordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [ErrorForm, setErrorForm] = useState<Error>();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);

        const Token = query.get('Code');

        await Api.post('/user/reset-password', {
            Token,
            Password,
            PasswordConfirmation
        }).then((response) => {
            if (response.status === 200) {
                alert('Senha alterada!');
                history.push('/account/login');
            }
        }).catch((error) => {
            setErrorForm(error.response.data);
        });

        setLoading(false);
    }

    return (
        <div className="container-full login-container">
            <div className="painel-login">
                <form onSubmit={onSubmit}>
                    <img src={Logo} alt="Logo" />
                    <h1>CDTR</h1>
                    <h2>ALTERAR SENHA</h2>

                    {
                        ErrorForm?.message !== undefined
                            ? (
                                <div className="Message-error">
                                    <p>{ErrorForm.message}</p>
                                </div>
                            )
                            : (
                                <>
                                    <br />
                                    <br />
                                </>
                            )
                    }

                    <input
                        className="input-account"
                        type="password"
                        id="Password"
                        name="Password"
                        placeholder="Nova Senha"
                        value={Password}
                        onChange={event => setPassword(event.target.value)}
                    />

                    {
                        ErrorForm?.errors !== undefined
                            ? ErrorForm.errors.Password !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Password[0]}</p>
                                    </div>
                                )
                                : (
                                    <>
                                        <br />
                                        <br />
                                    </>
                                )
                            : (
                                <>
                                    <br />
                                    <br />
                                </>
                            )
                    }

                    <input
                        className="input-account"
                        type="password"
                        id="PasswordConfirmation"
                        name="PasswordConfirmation"
                        placeholder="Confirme a Senha"
                        value={PasswordConfirmation}
                        onChange={event => setPasswordConfirmation(event.target.value)}
                    />

                    {
                        ErrorForm?.errors !== undefined
                            ? ErrorForm.errors.PasswordConfirmation !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.PasswordConfirmation[0]}</p>
                                    </div>
                                )
                                : (
                                    <>
                                        <br />
                                        <br />
                                    </>
                                )
                            : (
                                <>
                                    <br />
                                    <br />
                                </>
                            )
                    }

                    <button type="submit">
                        {
                            Loading ? (<img src={loading} alt="Loading" />) : "Enviar"
                        }
                    </button>
                </form>

            </div>
        </div>
    );
}

export default ResetPassword;