import "./style.css";
import Header from "../../Components/Header";
import Aside from "../../Components/Aside";
import Footer from "../../Components/Footer";
import Main from "../../Components/Main";
import ButtonAdd from "../../Components/ButtonAdd";
import { RowsDeleted } from "../../Interfaces";
import ButtonAct from "../../Components/ButtonAct";
import { useDispatch } from "react-redux";
import { ProdutoresActive } from "../../Actions/PageActiveActions";
import Logo from "../../Assets/images/logo.png";
import useProdutor from "../../Hooks/useProdutor";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "../../Components/Container";

const Produtor = () => {
  const dispatch = useDispatch();
  const { produtores } = useProdutor(undefined, true);

  dispatch(ProdutoresActive());

  const customAcoesRender = (value: any) => {
    return (
      <div className="div-act">
        <ButtonAct to={`/produtor/contas/${value}`} type="contas" />
        <ButtonAct to={`/produtor/edit/${value}`} type="editar" />
        <ButtonAct to={`/produtor/details/${value}`} type="detalhes" />
      </div>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "ProdutorId",
      headerName: "ID",
      filterable: true,
      sortable: true,
      width: 70,
    },
    {
      field: "Nome",
      headerName: "Nome",
      filterable: true,
      sortable: true,
      width: 300,
    },
    {
      field: "CpfCnpj",
      headerName: "CPF/CNPJ",
      filterable: true,
      sortable: true,
      width: 175,
    },
    {
      field: "Telefone",
      headerName: "Telefone",
      filterable: true,
      sortable: true,
      width: 150,
    },
    {
      field: "acoes",
      headerName: "Ações",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customAcoesRender(params.row.ProdutorId);
      },
      width: 120,
    },
  ];

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <Container>
          <DataGrid
            rows={produtores}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row.ProdutorId}
            
          />
        </Container>
      </Main>
      <ButtonAdd to="/produtor/create" />
      <Footer />
    </>
  );
};

export default Produtor;
