import Header from "../../Components/Header";
import Aside from "../../Components/Aside";
import Footer from "../../Components/Footer";
import Main from "../../Components/Main";
import ButtonAdd from "../../Components/ButtonAdd";
import ButtonAct from "../../Components/ButtonAct";
import { useDispatch } from "react-redux";
import { PropriedadesActive } from "../../Actions/PageActiveActions";
import Logo from "../../Assets/images/logo.png";
import usePropriedade from "../../Hooks/usePropriedade";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "../../Components/Container";

const Propriedade = () => {
  const dispatch = useDispatch();
  const { propriedades } = usePropriedade(undefined, true);

  dispatch(PropriedadesActive());

  const customAcoesRender = (value: string) => {
    return (
      <div className="div-act">
        <ButtonAct to={`/propriedade/edit/${value}`} type="editar" />
        <ButtonAct to={`/propriedade/details/${value}`} type="detalhes" />
      </div>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "PropriedadeId",
      headerName: "ID",
      filterable: true,
      sortable: true,
    },
    {
      field: "Nirf",
      headerName: "NIRF",
      filterable: true,
      sortable: true,
    },
    {
      field: "Nome",
      headerName: "Nome",
      filterable: true,
      sortable: true,
    },
    {
      field: "Produtor",
      headerName: "Produtor",
      filterable: true,
      sortable: true,
      renderCell: (params) => {
        return params.row.Produtor.Nome;
      },
    },
    {
      field: "acoes",
      headerName: "Ações",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customAcoesRender(params.row.PropriedadeId);
      },
    },
  ];

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <Container>
          <DataGrid
            rows={propriedades}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row.PropriedadeId}
          />
        </Container>
      </Main>
      <ButtonAdd to="/propriedade/create" />
      <Footer />
    </>
  );
};

export default Propriedade;
