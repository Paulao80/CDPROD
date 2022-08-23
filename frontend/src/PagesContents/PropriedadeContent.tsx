import Header from "../Components/Header";
import Aside from "../Components/Aside";
import Footer from "../Components/Footer";
import Main from "../Components/Main";
import Container from "../Components/Container";
import BtnSave from "../Components/ButtonSave";
import { TextField, MenuItem } from "@mui/material";
import PainelNav from "../Components/PainelNav";
import { NirfMaskCustom } from "../Util/Mask";
import { FormEvent } from "react";
import Logo from "../Assets/images/logo.png";
import { useDispatch } from "react-redux";
import { PropriedadesActive } from "../Actions/PageActiveActions";
import usePropriedade from "../Hooks/usePropriedade";
import { SetFormData } from "../Util/Functions";
import useLocalidade from "../Hooks/useLocalidade";
import useProdutor from "../Hooks/useProdutor";

const PropriedadeContent = (id?: number) => {
  const dispatch = useDispatch();
  const { errorForm, form, setForm, onFinish, onEdit } = usePropriedade(id);
  const { produtores } = useProdutor(undefined, true);
  const { ufs } = useLocalidade(true);

  dispatch(PropriedadesActive());

  const OnSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (id) {
      onEdit();
    } else {
      onFinish();
    }
  };

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <PainelNav
          to="/propriedade"
          titulo={`${id ? "Editar" : "Adicionar"} Propriedade`}
        />

        <Container>
          <form onSubmit={OnSubmit}>
            {errorForm?.message !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.message}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Nirf"
              id="Nirf"
              label="NIRF"
              variant="outlined"
              InputProps={{
                inputComponent: NirfMaskCustom as any,
              }}
              fullWidth
              margin="normal"
              value={form?.Nirf}
              onChange={(event) => SetFormData(event, setForm)}
            />

            {errorForm?.errors?.Nirf !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Nirf[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Nome"
              id="Nome"
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.Nome}
              onChange={(event) => SetFormData(event, setForm)}
            />

            {errorForm?.errors?.Nome !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Nome[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="InscEstadual"
              id="InscEstadual"
              label="Inscrição Estadual"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.InscEstadual}
              onChange={(event) => SetFormData(event, setForm)}
            />

            {errorForm?.errors?.InscEstadual !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.InscEstadual[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Endereco"
              id="Endereco"
              label="Endereço"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.Endereco}
              onChange={(event) => SetFormData(event, setForm)}
            />

            {errorForm?.errors?.Endereco !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Endereco[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Municipio"
              id="Municipio"
              label="Municipio"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.Municipio}
              onChange={(event) => SetFormData(event, setForm)}
            />

            {errorForm?.errors?.Municipio !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Municipio[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Estado"
              id="Estado"
              label="Estado"
              variant="outlined"
              select
              fullWidth
              margin="normal"
              value={form?.Estado}
              onChange={(event) => SetFormData(event, setForm)}
            >
              {ufs.map((uf) => {
                return (
                  <MenuItem key={uf.id} value={uf.sigla}>
                    {uf.nome}
                  </MenuItem>
                );
              })}
            </TextField>

            {errorForm?.errors?.Estado !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Estado[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="ProdutorId"
              id="ProdutorId"
              label="Produtor"
              variant="outlined"
              select
              fullWidth
              margin="normal"
              value={
                form?.Produtor?.ProdutorId === undefined
                  ? ""
                  : form?.Produtor?.ProdutorId
              }
              onChange={(event) =>
                setForm((prev) => {
                  return {
                    ...prev,
                    Produtor: {
                      ProdutorId: Number(event.target.value),
                    },
                  };
                })
              }
            >
              {produtores.map((produtor) => {
                return (
                  <MenuItem
                    key={produtor.ProdutorId}
                    value={produtor.ProdutorId}
                  >
                    {`${produtor.ProdutorId} - ${produtor.Nome}`}
                  </MenuItem>
                );
              })}
            </TextField>

            {errorForm?.errors !== undefined &&
            errorForm?.errors["Produtor.ProdutorId"] !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors["Produtor.ProdutorId"][0]}</p>
              </div>
            ) : (
              ""
            )}

            <BtnSave />
          </form>
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default PropriedadeContent;
