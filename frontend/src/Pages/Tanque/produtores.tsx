import "./style.css";
import Header from "../../Components/Header";
import Aside from "../../Components/Aside";
import Footer from "../../Components/Footer";
import Main from "../../Components/Main";
import ButtonAdd from "../../Components/ButtonAdd";
import { useParams } from "react-router-dom";
import PainelNav from "../../Components/PainelNav";
import { OperationModal } from "../../Interfaces";
import Logo from "../../Assets/images/logo.png";
import { useDispatch } from "react-redux";
import { TanquesActive } from "../../Actions/PageActiveActions";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useProdutorTanque from "../../Hooks/useProdutorTanque";
import Container from "../../Components/Container";
import useModal from "../../Hooks/useModal";
import { KEY_M_PRODUTORTANQUES } from "../../constants/modals/keys";
import { TITLE_M_ADD_PRODUTORTANQUES } from "../../constants/modals/titles";
import ModalX from "../../Components/Modal";
import useProdutor from "../../Hooks/useProdutor";
import Form, { Field } from "rc-field-form";
import { TextFieldX } from "../../Components/Fields";
import { GetSimNao } from "../../Util/Functions";
import { MenuItem } from "@mui/material";

interface Param {
  id: string;
}

const ProdutoresTanques = () => {
  const { id } = useParams<Param>();

  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { produtores } = useProdutor(undefined, true);
  const { produtoresTanques, form, onFinish, errorForm } = useProdutorTanque(
    id ? Number(id) : undefined,
    true
  );

  dispatch(TanquesActive());

  const handleOpen = () => {
    openModal({
      key: KEY_M_PRODUTORTANQUES,
      title: TITLE_M_ADD_PRODUTORTANQUES,
      operation: OperationModal.Add,
    });
  };

  const columns: GridColDef[] = [
    {
      field: "PRodutorId",
      headerName: "ID",
      filterable: true,
      sortable: true,
      renderCell: (params) => {
        return params.row.Produtor.ProdutorId;
      },
    },
    {
      field: "PRodutorNome",
      headerName: "Nome",
      filterable: true,
      sortable: true,
      renderCell: (params) => {
        return params.row.Produtor.Nome;
      },
    },
    {
      field: "ProdutorCpfCnpj",
      headerName: "CPF/CNPJ",
      filterable: true,
      sortable: true,
      renderCell: (params) => {
        return params.row.Produtor.CpfCnpj;
      },
    },
    {
      field: "Responsavel",
      headerName: "Responsavel",
      filterable: true,
      sortable: false,
      renderCell: (params) => {
        return GetSimNao(params.row.Responsavel);
      },
    },
  ];

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <PainelNav to={`/tanque`} titulo="Produtores" />
        <Container>
          <DataGrid
            rows={produtoresTanques}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row.ProdutorTanqueId}
          />
        </Container>
        <ModalX
          keyValue={KEY_M_PRODUTORTANQUES}
          width={900}
          onFinish={onFinish}
        >
          <Form form={form}>
            {errorForm?.message !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.message}</p>
              </div>
            ) : (
              ""
            )}

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

            <Field name="Responsavel">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Responsavel"
                  variant="outlined"
                  select
                  fullWidth
                  margin="normal"
                >
                  <MenuItem key={1} value={1}>
                    Sim
                  </MenuItem>
                  <MenuItem key={2} value={0}>
                    Não
                  </MenuItem>
                </TextFieldX>
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

export default ProdutoresTanques;
