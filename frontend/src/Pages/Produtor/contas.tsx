import { useParams } from "react-router-dom";
import Aside from "../../Components/Aside";
import ButtonAdd from "../../Components/ButtonAdd";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Main from "../../Components/Main";
import PainelNav from "../../Components/PainelNav";
import "./style.css";
import Logo from "../../Assets/images/logo.png";
import { useDispatch } from "react-redux";
import { ProdutoresActive } from "../../Actions/PageActiveActions";
import useContaBancaria from "../../Hooks/useContaBancaria";
import Container from "../../Components/Container";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ModalX from "../../Components/Modal";
import useModal from "../../Hooks/useModal";
import { OperationModal } from "../../Interfaces";
import Form, { Field } from "rc-field-form";
import { HiddenX, TextFieldX } from "../../Components/Fields";
import ButtonAct from "../../Components/ButtonAct";

interface Param {
  id?: string;
}

const Contas = () => {
  const { id } = useParams<Param>();

  const dispatch = useDispatch();
  const { openModal } = useModal();
  const {
    contasBancarias,
    form,
    onFinish,
    onEdit,
    errorForm,
    produtor,
    onChangePertenceProdutor,
    pertenceProdutor,
    setFormData,
  } = useContaBancaria(undefined, id ? Number(id) : undefined, true);

  dispatch(ProdutoresActive());

  const handleOpen = () => {
    openModal({
      key: "mdl-contasbancarias",
      title: "Teste",
      operation: OperationModal.Add,
    });
  };

  const customAcoesRender = (row: any) => {
    row.PertenceProdutor = row.NomePertence === produtor.Nome;
    return (
      <div className="div-act">
        <ButtonAct
          type="editar"
          toOpenModal
          setFormData={setFormData}
          row={row}
          modal={{
            key: "mdl-contasbancarias",
            operation: OperationModal.Edit,
            title: "Teste",
          }}
        />
      </div>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "ContaId",
      headerName: "ID",
      filterable: true,
      sortable: true,
    },
    {
      field: "NomePertence",
      headerName: "Nome",
      filterable: true,
      sortable: true,
    },
    {
      field: "Banco",
      headerName: "Banco",
      filterable: true,
      sortable: true,
    },
    {
      field: "Agencia",
      headerName: "Agencia",
      filterable: true,
      sortable: true,
    },
    {
      field: "Conta",
      headerName: "Conta",
      filterable: true,
      sortable: true,
    },
    {
      field: "acoes",
      headerName: "Ações",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customAcoesRender(params.row);
      },
    },
  ];

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <PainelNav to={`/produtor`} titulo="Contas" />
        <Container>
          <DataGrid
            rows={contasBancarias}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row.ContaId}
          />
        </Container>
        <ModalX
          keyValue="mdl-contasbancarias"
          width={900}
          onFinish={onFinish}
          onEdit={onEdit}
        >
          <Form form={form}>
            {errorForm?.message !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.message}</p>
              </div>
            ) : (
              ""
            )}

            <Field name="ContaId">
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

            <Field
              name="PertenceProdutor"
              valuePropName="checked"
              initialValue={false}
            >
              {(input) => {
                return (
                  <>
                    {`Pertence ao produtor ${produtor?.Nome}? `}
                    <input
                      checked={input.checked}
                      type="checkbox"
                      onChange={(event) => {
                        if (input?.onChange) input.onChange(event);
                        onChangePertenceProdutor();
                      }}
                    />
                  </>
                );
              }}
            </Field>

            <Field name="NomePertence">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Nome Pertence"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  disabled={pertenceProdutor}
                />
              )}
            </Field>

            <Field name="Banco">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Banco"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="Agencia">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Agencia"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="Conta">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Conta"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>
          </Form>
        </ModalX>
      </Main>
      <ButtonAdd onClick={handleOpen} />
      <Footer />
    </>
  );
};

export default Contas;
