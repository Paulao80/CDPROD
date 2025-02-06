import "./style.css";
import Header from "../../Components/Header";
import Aside from "../../Components/Aside";
import Footer from "../../Components/Footer";
import Main from "../../Components/Main";
import ButtonAdd from "../../Components/ButtonAdd";
import ButtonAct from "../../Components/ButtonAct";
import { useDispatch } from "react-redux";
import { ProdutoresActive } from "../../Actions/PageActiveActions";
import Logo from "../../Assets/images/logo.png";
import useProdutor from "../../Hooks/useProdutor";
import {
  DataGrid,
  GridColDef,
  GridInputRowSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import Container from "../../Components/Container";
import { useCallback, useMemo, useRef, useState } from "react";
import ButtonDel from "../../Components/ButtonDel";
import DialogConfirmation, {
  DialogConfirmationRef,
} from "../../Components/Dialog/Confirmation";
import { TEXT_DELETE_PRODUTORES } from "../../constants/dialogs/text";

const Produtor = () => {
  const dispatch = useDispatch();

  const refDialogConfDel = useRef<DialogConfirmationRef | null>(null);

  const { produtores, onDelete } = useProdutor(undefined, true);
  
  const [rowsSelection, setRowsSelection] =
    useState<GridInputRowSelectionModel>([]);

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

  const showDelButton = useMemo(() => {
    if (Array.isArray(rowsSelection) && rowsSelection.length > 0) {
      return true;
    }

    return false;
  }, [rowsSelection]);

  const CustomToolbar = useCallback(() => {
    return (
      <GridToolbarContainer>
        {showDelButton && (
          <ButtonDel
            onClick={() => {
              refDialogConfDel.current?.setOpen(true);
            }}
          />
        )}
      </GridToolbarContainer>
    );
  }, [showDelButton]);

  const onOkConfDel = useCallback(() => {
    if (Array.isArray(rowsSelection)) {
      rowsSelection.forEach((produtorId: number) => {
        onDelete(produtorId).then((resp) => {
          if (resp) {
            setRowsSelection((prev) => {
              if (Array.isArray(prev)) {
                prev = prev.filter((f) => f !== produtorId);
              }

              return prev;
            });
          }
        });
      });
    }
  }, [onDelete, rowsSelection]);

  const columns: GridColDef[] = [
    {
      field: "ProdutorId",
      headerName: "ID",
      filterable: true,
      sortable: true,
      flex: 0.5
    },
    {
      field: "Nome",
      headerName: "Nome",
      filterable: true,
      sortable: true,
      flex: 2
    },
    {
      field: "CpfCnpj",
      headerName: "CPF/CNPJ",
      filterable: true,
      sortable: true,
      flex: 1
    },
    {
      field: "Telefone",
      headerName: "Telefone",
      filterable: true,
      sortable: true,
      flex: 1
    },
    {
      field: "acoes",
      headerName: "Ações",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customAcoesRender(params.row.ProdutorId);
      },
      flex: 0.75,
    },
  ];

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <DialogConfirmation
          ref={(el) => {
            refDialogConfDel.current = el;
          }}
          text={TEXT_DELETE_PRODUTORES}
          onCancelText="Não"
          onOkText="Sim"
          onOk={onOkConfDel}
        />

        <Container>
          <DataGrid
            onRowSelectionModelChange={(rows) => setRowsSelection(rows)}
            rowSelectionModel={rowsSelection}
            rows={produtores}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.ProdutorId}
            pageSizeOptions={[5]}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </Container>
      </Main>
      <ButtonAdd to="/produtor/create" />
      <Footer />
    </>
  );
};

export default Produtor;
