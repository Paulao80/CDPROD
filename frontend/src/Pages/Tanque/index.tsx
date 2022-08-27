import "./style.css";
import Header from "../../Components/Header";
import Aside from "../../Components/Aside";
import Footer from "../../Components/Footer";
import Main from "../../Components/Main";
import ButtonAdd from "../../Components/ButtonAdd";
import ButtonAct from "../../Components/ButtonAct";
import { useDispatch } from "react-redux";
import { TanquesActive } from "../../Actions/PageActiveActions";
import Logo from "../../Assets/images/logo.png";
import useTanque from "../../Hooks/useTanque";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "../../Components/Container";

const Tanque = () => {
  const dispatch = useDispatch();
  const { tanques } = useTanque(undefined, true);

  dispatch(TanquesActive());

  const customFotoRender = (value: string) => {
    return <img className="img-tanque" src={value} alt="Foto" />;
  };

  const customAcoesRender = (value: string) => {
    return (
      <div className="div-act">
        <ButtonAct to={`/tanque/produtores/${value}`} type="produtores" />
        <ButtonAct to={`/tanque/edit/${value}`} type="editar" />
        <ButtonAct to={`/tanque/details/${value}`} type="detalhes" />
      </div>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "FotoPath",
      headerName: "Foto",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customFotoRender(params.row.FotoPath);
      },
    },
    {
      field: "TanqueId",
      headerName: "ID",
      filterable: true,
      sortable: true,
    },
    {
      field: "Capacidade",
      headerName: "Capacidade (L)",
      filterable: true,
      sortable: true,
    },
    {
      field: "Marca",
      headerName: "Marca",
      filterable: true,
      sortable: true,
    },
    {
      field: "acoes",
      headerName: "Ações",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customAcoesRender(params.row.TanqueId);
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
            rows={tanques}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row.TanqueId}
          />
        </Container>
      </Main>
      <ButtonAdd to="/tanque/create" />
      <Footer />
    </>
  );
};

export default Tanque;
