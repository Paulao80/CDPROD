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

interface Param {
  id?: string;
}

const Contas = () => {
  const { id } = useParams<Param>();

  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { contasBancarias } = useContaBancaria(
    undefined,
    id ? Number(id) : undefined,
    true
  );

  dispatch(ProdutoresActive());

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
  ];

  const handleOpen = () => {
    openModal({
      key: "teste",
      title: "Teste",
      operation: OperationModal.Info,
    });
  };

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
        <ModalX keyValue="teste" width={900}>
          aqui
        </ModalX>
      </Main>
      <ButtonAdd onClick={handleOpen} />
      <Footer />
    </>
  );
};

export default Contas;
