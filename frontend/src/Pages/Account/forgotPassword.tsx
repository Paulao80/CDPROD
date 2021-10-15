import './style.css';
import Logo from '../../Assets/images/vaca.png';
import { FormEvent, useState } from 'react';
import loading from '../../Assets/images/loading.gif';
import { useHistory } from 'react-router-dom';
import Api from '../../Services/Api';

interface Error {
    message: string;
    errors: {
        Email: string[];
        Link: string[];
    };
}

const ForgotPassword = () => {
    const history = useHistory();

    const [Email, setEmail] = useState<string>("");
    const [Loading, setLoading] = useState(false);
    const [ErrorForm, setErrorForm] = useState<Error>();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);

        const Link = `${window.location.origin}/account/reset-password`;

        await Api.post('/user/forgot-password', {
            Email,
            Link
        }).then((response) => {
            if (response.status === 200) {
                history.push('/account/forgot-password-confirmation');
            }
        }).catch((error) => {
            setErrorForm(error.response.data);
        });

        setLoading(false);
    }

    return (
        <div className="container-full login-container">
            <div className="painel-login">
                <br />
                <br />
                <form onSubmit={onSubmit}>
                    <img src={Logo} alt="Logo" />
                    <h1>CDTR</h1>
                    <h2>ESQUECEU A SENHA</h2>

                    <br />
                    <br />

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
                        type="text"
                        id="Email"
                        name="Email"
                        placeholder="E-mail"
                        value={Email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    {
                        ErrorForm?.errors.Email !== undefined
                            ? (
                                <div className="Message-error">
                                    <p>{ErrorForm.errors.Email[0]}</p>
                                </div>
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
};

export default ForgotPassword;