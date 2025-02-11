import Header from "../../Components/Header";
import Aside from "../../Components/Aside";
import Footer from "../../Components/Footer";
import Main from "../../Components/Main";
import Container from "../../Components/Container";
import BtnSave from "../../Components/ButtonSave";
import Painel from "../../Components/Painel";
import { ChangeEvent, useState } from "react";
import "./style.css";
import Logo from "../../Assets/images/vaca.png";
import { useNavigate } from "react-router-dom";
import { register } from "./../../Services/Auth";
import { useDispatch } from "react-redux";
import { NoneActive } from "../../Actions/PageActiveActions";
import { TextField } from "@mui/material";

interface Error {
  message: string;
  errors: {
    Email: string[];
    Name: string[];
    User: string[];
    Password: string[];
    PasswordConfimation: string[];
  };
}

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  dispatch(NoneActive());

  const [Name, setName] = useState("");
  const [User, setUser] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfimation, setPasswordConfimation] = useState("");
  const [image, setImage] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [ErrorForm, SetErrorForm] = useState<Error>();

  const SelectedImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const imagens = Array.from(event.target.files);

    setImage(imagens);

    const imagensPreview = imagens.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreview(imagensPreview);
  };

  const onSubmit = async () => {
    await register(
      Name,
      User,
      Email,
      Password,
      PasswordConfimation,
      image
    ).then((response) => {
      if (response.status === 201) navigate("/dashboard");
      else {
        SetErrorForm(response.data);
      }
    });
  };

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <Painel titulo="Registrar Usuário" />
        <Container>
          <form>
            <TextField
              name="Name"
              id="Name"
              label="Nome"
              variant="outlined"
              fullWidth
              // required
              margin="normal"
              value={Name}
              onChange={(event) => setName(event.target.value)}
            />

            {ErrorForm?.errors.Name !== undefined ? (
              <div className="Message-error">
                <p>{ErrorForm.errors.Name[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="User"
              id="User"
              label="Usuário"
              variant="outlined"
              fullWidth
              // required
              margin="normal"
              value={User}
              onChange={(event) => setUser(event.target.value)}
            />

            {ErrorForm?.errors.User !== undefined ? (
              <div className="Message-error">
                <p>{ErrorForm.errors.User[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Email"
              id="Email"
              label="Email"
              variant="outlined"
              fullWidth
              // required
              margin="normal"
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
            />

            {ErrorForm?.errors.Email !== undefined ? (
              <div className="Message-error">
                <p>{ErrorForm.errors.Email[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              type="password"
              name="Password"
              id="Password"
              label="Senha"
              variant="outlined"
              fullWidth
              // required
              margin="normal"
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {ErrorForm?.errors.Password !== undefined ? (
              <div className="Message-error">
                <p>{ErrorForm.errors.Password[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              type="password"
              name="PasswordConfimation"
              id="PasswordConfimation"
              label="Confirmar Senha"
              variant="outlined"
              fullWidth
              margin="normal"
              value={PasswordConfimation}
              onChange={(event) => setPasswordConfimation(event.target.value)}
            />

            {ErrorForm?.errors.PasswordConfimation !== undefined ? (
              <div className="Message-error">
                <p>{ErrorForm.errors.PasswordConfimation[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Foto"
              id="Foto"
              label="Foto do Usuário"
              variant="outlined"
              type="file"
              fullWidth
              // required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={SelectedImages}
            />

            {preview.map((image) => (
              <img
                className="img-details"
                key={image}
                src={image}
                alt="imagem"
              />
            ))}

            <BtnSave onClick={onSubmit}/>
          </form>
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default Register;
