import Header from "../Components/Header";
import Aside from "../Components/Aside";
import Footer from "../Components/Footer";
import Main from "../Components/Main";
import Container from "../Components/Container";
import BtnSave from "../Components/ButtonSave";
import { MenuItem } from "@mui/material";
import PainelNav from "../Components/PainelNav";
import { NirfMaskCustom } from "../Util/Mask";
import { FormEvent } from "react";
import Logo from "../Assets/images/logo.png";
import { useDispatch } from "react-redux";
import { PropriedadesActive } from "../Actions/PageActiveActions";
import usePropriedade from "../Hooks/usePropriedade";
import useLocalidade from "../Hooks/useLocalidade";
import useProdutor from "../Hooks/useProdutor";
import { HiddenX, TextFieldX } from "../Components/Fields";
import Form, { Field } from "rc-field-form";

const PropriedadeContent = (id?: number) => {
  const dispatch = useDispatch();
  const { errorForm, form, onFinish, onEdit } = usePropriedade(id);
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
          <Form form={form} onFinish={OnSubmit}>
            {errorForm?.message !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.message}</p>
              </div>
            ) : (
              ""
            )}

            <Field name="PropriedadeId">
              {(input, meta) => (
                <HiddenX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  type="number"
                  hidden
                />
              )}
            </Field>

            <Field name="Nirf">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="NIRF"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NirfMaskCustom as any,
                  }}
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="Nome">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="InscEstadual">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Inscrição Estadual"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="Endereco">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Endereço"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="Municipio">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Municipio"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="Estado">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Estado"
                  variant="outlined"
                  select
                  fullWidth
                  margin="normal"
                >
                  {ufs.map((uf) => {
                    return (
                      <MenuItem key={uf.id} value={uf.sigla}>
                        {uf.nome}
                      </MenuItem>
                    );
                  })}
                </TextFieldX>
              )}
            </Field>

            <Field name={["Produtor", "ProdutorId"]}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Produtor"
                  variant="outlined"
                  select
                  fullWidth
                  margin="normal"
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
                </TextFieldX>
              )}
            </Field>
            <BtnSave onClick={OnSubmit} form={form} />
          </Form>
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default PropriedadeContent;
