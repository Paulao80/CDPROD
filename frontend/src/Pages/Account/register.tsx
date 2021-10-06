import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnSave from '../../Components/ButtonSave';
import Painel from '../../Components/Painel';
import { TextField } from '@material-ui/core';
import { ChangeEvent, FormEvent, useState } from 'react';
import './style.css';
import Logo from '../../Assets/images/vaca.png';
import Api from '../../Services/Api';
import { useHistory } from 'react-router-dom';

const Register = () => {

    const history = useHistory();

    const [Name, setName] = useState("");
    const [User, setUser] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [image, setImage] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);

    const SelectedImages = (event: ChangeEvent<HTMLInputElement>) => {

        if (!event.target.files) {
            return;
        }

        const imagens = Array.from(event.target.files);

        setImage(imagens);

        const imagensPreview = imagens.map(image => {
            return URL.createObjectURL(image);
        });

        setPreview(imagensPreview);
    }

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const data = new FormData();

        data.append('Name', Name);
        data.append('User', User);
        data.append('Email', Email);
        data.append('Password', Password);

        image.forEach(image => {
            data.append('image', image);
        });

        await Api.post('/user/register', data);

        history.push('/dashboard');
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <Painel titulo="Registrar Usuário" />
                <Container>
                    <form onSubmit={onSubmit}>

                        <TextField
                            name="Name"
                            id="Name"
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Name}
                            onChange={event => setName(event.target.value)}
                        />

                        <TextField
                            name="User"
                            id="User"
                            label="Usuário"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={User}
                            onChange={event => setUser(event.target.value)}
                        />

                        <TextField
                            name="Email"
                            id="Email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Email}
                            onChange={event => setEmail(event.target.value)}
                        />


                        <TextField
                            type="password"
                            name="Password"
                            id="Password"
                            label="Senha"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <TextField
                            name="Foto"
                            id="Foto"
                            label="Foto do Usuário"
                            variant="outlined"
                            type="file"
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={SelectedImages}
                        />

                        {preview.map(image => (
                            <img className="img-details" key={image} src={image} alt="imagem" />
                        ))}

                        <BtnSave />
                    </form>
                </Container>
            </Main>
            <Footer />
        </>
    );
}

export default Register;