import Header from "../Components/Header";
import Aside from "../Components/Aside";
import Footer from "../Components/Footer";
import Main from "../Components/Main";
import Container from "../Components/Container";
import BtnSave from "../Components/ButtonSave";
import { TextField, MenuItem } from "@mui/material";
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
import { IsBlank } from "../Util/Functions";

const ProdutorContent = (id?: number) => {
  const dispatch = useDispatch();
  const { errorForm, form, setForm, onFinish, onEdit } = useProdutor(id);
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
          <form onSubmit={OnSubmit}>
            {errorForm?.message !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.message}</p>
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
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, Nome: event.target.value };
                })
              }
              InputLabelProps={{
                shrink: !IsBlank(id) || !IsBlank(form?.Nome),
              }}
            />

            {errorForm?.errors?.Nome !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Nome[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="DataNasc"
              id="DataNasc"
              label="Data de Nascimento"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              value={form?.DataNasc}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, DataNasc: event.target.value };
                })
              }
            />

            {errorForm?.errors?.DataNasc !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.DataNasc[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="TipoPessoa"
              id="TipoPessoa"
              label="Tipo de Pessoa"
              variant="outlined"
              select
              fullWidth
              margin="normal"
              value={form?.TipoPessoa === 0 ? "" : form?.TipoPessoa}
              onChange={(event) => {
                const TipoPessoa = Number(event.target.value);
                setForm((prev) => {
                  return { ...prev, TipoPessoa };
                });

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
            </TextField>

            {errorForm?.errors?.TipoPessoa !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.TipoPessoa[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Nacionalidade"
              id="Nacionalidade"
              label="Nacionalidade"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.Nacionalidade}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, Nacionalidade: event.target.value };
                })
              }
              InputLabelProps={{
                shrink: !IsBlank(id) || !IsBlank(form?.Nacionalidade),
              }}
            />

            {errorForm?.errors?.Nacionalidade !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Nacionalidade[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="CpfCnpj"
              id="CpfCnpj"
              label="CPF/CNPJ"
              variant="outlined"
              InputProps={inputComponent}
              fullWidth
              margin="normal"
              value={form?.CpfCnpj}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, CpfCnpj: event.target.value };
                })
              }
              InputLabelProps={{
                shrink: !IsBlank(id) || !IsBlank(form?.CpfCnpj),
              }}
            />

            {errorForm?.errors?.CpfCnpj !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.CpfCnpj[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="RG"
              id="RG"
              label="RG"
              variant="outlined"
              InputProps={{
                inputComponent: RgMaskCustom as any,
              }}
              fullWidth
              margin="normal"
              value={form?.RG}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, RG: event.target.value };
                })
              }
              InputLabelProps={{
                shrink: !IsBlank(id) || !IsBlank(form?.RG),
              }}
            />

            {errorForm?.errors?.RG !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.RG[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="OrgaoExp"
              id="OrgaoExp"
              label="Orgão de Expedição"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.OrgaoExp}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, OrgaoExp: event.target.value };
                })
              }
              InputLabelProps={{
                shrink: !IsBlank(id) || !IsBlank(form?.OrgaoExp),
              }}
            />

            {errorForm?.errors?.OrgaoExp !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.OrgaoExp[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="EstadoExp"
              id="EstadoExp"
              label="Estado de Expedição"
              variant="outlined"
              select
              fullWidth
              margin="normal"
              value={form?.EstadoExp}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, EstadoExp: event.target.value };
                })
              }
            >
              {ufs.map((uf) => {
                return (
                  <MenuItem key={uf.id} value={uf.sigla}>
                    {uf.nome}
                  </MenuItem>
                );
              })}
            </TextField>

            {errorForm?.errors?.EstadoExp !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.EstadoExp[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="DataExp"
              id="DataExp"
              label="Data de Expedição"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              value={form?.DataExp}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, DataExp: event.target.value };
                })
              }
            />

            {errorForm?.errors?.DataExp !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.DataExp[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="EstadoCivil"
              id="EstadoCivil"
              label="Estado Civil"
              variant="outlined"
              select
              fullWidth
              margin="normal"
              value={form?.EstadoCivil === 0 ? "" : form?.EstadoCivil}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, EstadoCivil: Number(event.target.value) };
                })
              }
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
            </TextField>

            {errorForm?.errors?.EstadoCivil !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.EstadoCivil[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Telefone"
              id="Telefone"
              label="Telefone"
              variant="outlined"
              InputProps={{
                inputComponent: TelefoneMaskCustom as any,
              }}
              fullWidth
              margin="normal"
              value={form?.Telefone}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, Telefone: event.target.value };
                })
              }
              InputLabelProps={{
                shrink: !IsBlank(id) || !IsBlank(form?.Telefone),
              }}
            />

            {errorForm?.errors?.Telefone !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Telefone[0]}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="UltLaticinio"
              id="UltLaticinio"
              label="Último Laticinio"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.UltLaticinio ? form?.UltLaticinio : ""}
              onChange={(event) =>
                setForm((prev) => {
                  return { ...prev, UltLaticinio: event.target.value };
                })
              }
              InputLabelProps={{
                shrink: !IsBlank(id) || !IsBlank(form?.UltLaticinio),
              }}
            />

            {errorForm?.errors?.UltLaticinio !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.UltLaticinio[0]}</p>
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

export default ProdutorContent;
