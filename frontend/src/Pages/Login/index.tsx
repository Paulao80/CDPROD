import './style.css';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/images/vaca.png';

const Login = () => {
    const style = {
        root: {
            '& label.Mui-focused': {
                color: '#77baff',
            },
            '& label': {
                color: 'white'
            },
            '& input': {
                color: 'white'
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#77baff',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'white',
                },
                '&:hover fieldset': {
                    borderColor: '#a2d0ff',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#77baff',
                },
            },
        },
    }

    const CssTextField = withStyles(style)(TextField);

    return (
        <div className="container-full login-container">
            <div className="painel-login">
                <img src={Logo} alt="Logo" />
                <h1>CDTR</h1>
                <h2>LOGIN</h2>
                <CssTextField id="User" name="User" label="Usuario" variant="outlined" fullWidth margin="normal" />
                <CssTextField id="Password" name="Password" label="Senha" variant="outlined" type="password" fullWidth margin="normal" />
                <Link to="/account/forgot-password">Esqueceu a Senha?</Link>
                <button>Logar</button>
            </div>
        </div>
    );
}

export default Login;