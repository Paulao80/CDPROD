import './style.css';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header";
import Logo from '../../Assets/images/logo.png';
import Aside from "../../Components/Aside";
import Main from "../../Components/Main";
import Painel from "../../Components/Painel";
import Container from "../../Components/Container";
import Footer from "../../Components/Footer";
import BtnSave from '../../Components/ButtonSave';
import { TextField } from "@material-ui/core";
import { User as IUser } from '../../Interfaces'
import Api from "../../Services/Api";
import { update } from '../../Services/Auth';

interface Error {
    message: string;
    errors: {
        UserId: string[];
        Email: string[];
        Name: string[];
        User: string[];
        PasswordOld: string[];
        PasswordNew: string[];
        PasswordNewConfimation: string[]
    };
}

const Manage = () => {

    const history = useHistory();

    const [usuario, setUsuario] = useState<IUser>();

    useEffect(() => {
        Api.get(`/user`).then(response => {
            setUsuario(response.data);
        });
    }, []);

    const [UserId, setUserId] = useState(0);
    const [Name, setName] = useState("");
    const [User, setUser] = useState("");
    const [Email, setEmail] = useState("");
    const [PasswordOld, setPasswordOld] = useState<string>();
    const [PasswordNew, setPasswordNew] = useState<string>();
    const [PasswordNewConfimation, setPasswordNewConfimation] = useState<string>();
    const [image, setImage] = useState<File[]>();
    const [preview, setPreview] = useState<string[]>([]);
    const [ErrorForm, SetErrorForm] = useState<Error>();

    useEffect(() => {
        if (usuario) {
            setUserId(usuario.UserId);
            setName(usuario.Name);
            setUser(usuario.User);
            setEmail(usuario.Email);

            let FotoPath = [];
            FotoPath.push(usuario.FotoPath);
            setPreview(FotoPath);
        }
    }, [usuario]);

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

        await update(UserId, Name, User, Email, PasswordOld, PasswordNew, PasswordNewConfimation, image)
            .then((response) => {
                if (response.status === 200) history.push('/dashboard');
                else {
                    SetErrorForm(response.data);
                }
            });
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <Painel titulo="Gerenciar Usuário" />
                <Container>
                    <form onSubmit={onSubmit}>

                        <TextField
                            name="Name"
                            id="Name"
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={Name}
                            onChange={event => setName(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Name !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Name[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="User"
                            id="User"
                            label="Usuário"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={User}
                            onChange={event => setUser(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.User !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.User[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Email"
                            id="Email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
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
                                : ""
                        }

                        <TextField
                            type="password"
                            name="PasswordOld"
                            id="PasswordOld"
                            label="Senha atual"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={PasswordOld}
                            onChange={event => setPasswordOld(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.PasswordOld !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.PasswordOld[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            type="password"
                            name="PasswordNew"
                            id="PasswordNew"
                            label="Nova senha"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={PasswordNew}
                            onChange={event => setPasswordNew(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.PasswordNew !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.PasswordNew[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            type="password"
                            name="PasswordNewConfimation"
                            id="PasswordNewConfimation"
                            label="Confirme a nova senha"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={PasswordNewConfimation}
                            onChange={event => setPasswordNewConfimation(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.PasswordNewConfimation !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.PasswordNewConfimation[0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Foto"
                            id="Foto"
                            label="Foto do Usuário"
                            variant="outlined"
                            type="file"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={SelectedImages}
                        />

                        {preview.map(image => {
                            return (
                                <img className="img-details" key={image} src={image} alt="imagem" />
                            );
                        })}

                        <BtnSave />
                    </form>
                </Container>
            </Main>
            <Footer />
        </>
    );
}

export default Manage;