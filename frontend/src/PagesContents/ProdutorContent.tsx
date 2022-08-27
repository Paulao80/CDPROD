import Header from "../Components/Header";
import Aside from "../Components/Aside";
import Footer from "../Components/Footer";
import Main from "../Components/Main";
import Container from "../Components/Container";
import BtnSave from "../Components/ButtonSave";
import { MenuItem } from "@mui/material";
import {
  CpfMaskCustom,
  CnpjMaskCustom,
  RgMaskCustom,
  TelefoneMaskCustom,
} from "../Util/Mask";
import { useState, FormEvent } from "react";
import PainelNav from "../Components/PainelNav";
import Logo from "../Assets/images/logo.png";
import { useDispatch } from "react-redux";
import { ProdutoresActive } from "../Actions/PageActiveActions";
import useProdutor from "../Hooks/useProdutor";
import useLocalidade from "../Hooks/useLocalidade";
import { HiddenX, TextFieldX } from "../Components/Fields";
import Form, { Field } from "rc-field-form";
import * as validator from "../Validators";

const ProdutorContent = (id?: number) => {
  const dispatch = useDispatch();
  const { errorForm, form, onFinish, onEdit } = useProdutor(id);
  const { ufs } = useLocalidade(true);

  dispatch(ProdutoresActive());

  const [inputComponent, setinputComponent] = useState({
    inputComponent: CpfMaskCustom as any,
  });

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
          to="/produtor"
          titulo={`${id ? "Editar" : "Adicionar"} Produtor`}
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

            <Field name="ProdutorId">
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

            <Field name="Nome" rules={validator.Nome}>
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

            <Field name="DataNasc" rules={validator.DataNasc}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Data de Nascimento"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="TipoPessoa" rules={validator.TipoPessoa}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Tipo de Pessoa"
                  variant="outlined"
                  select
                  fullWidth
                  margin="normal"
                  onChange={(event) => {
                    if (input?.onChange) input.onChange(event);
                    const TipoPessoa = Number(event.target.value);

                    TipoPessoa === 1
                      ? setinputComponent({
                          inputComponent: CpfMaskCustom as any,
                        })
                      : setinputComponent({
                          inputComponent: CnpjMaskCustom as any,
                        });
                  }}
                >
                  <MenuItem key={1} value={1}>
                    Física
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Jurídica
                  </MenuItem>
                </TextFieldX>
              )}
            </Field>

            <Field name="Nacionalidade" rules={validator.Nacionalidade}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Nacionalidade"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="CpfCnpj" rules={validator.CpfCnpj}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="CPF/CNPJ"
                  variant="outlined"
                  InputProps={inputComponent}
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="RG" rules={validator.RG}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="RG"
                  variant="outlined"
                  InputProps={{
                    inputComponent: RgMaskCustom as any,
                  }}
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="OrgaoExp" rules={validator.OrgaoExp}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Orgão de Expedição"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="EstadoExp" rules={validator.EstadoExp}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Estado de Expedição"
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

            <Field name="DataExp" rules={validator.DataExp}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Data de Expedição"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="EstadoCivil" rules={validator.EstadoCivil}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Estado Civil"
                  variant="outlined"
                  select
                  fullWidth
                  margin="normal"
                >
                  <MenuItem key={1} value={1}>
                    solteiro(a)
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    casado(a)
                  </MenuItem>
                  <MenuItem key={3} value={3}>
                    separado(a)
                  </MenuItem>
                  <MenuItem key={4} value={4}>
                    divorciado(a)
                  </MenuItem>
                  <MenuItem key={5} value={5}>
                    viúvo(a)
                  </MenuItem>
                </TextFieldX>
              )}
            </Field>

            <Field name="Telefone" rules={validator.Telefone}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Telefone"
                  variant="outlined"
                  InputProps={{
                    inputComponent: TelefoneMaskCustom as any,
                  }}
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="UltLaticinio" rules={validator.UltLaticinio}>
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Último Laticinio"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
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

export default ProdutorContent;
