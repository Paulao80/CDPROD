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
import {
  DataGrid,
  GridColDef,
  GridInputRowSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import Container from "../../Components/Container";
import { useCallback, useMemo, useRef, useState } from "react";
import DialogConfirmation, {
  DialogConfirmationRef,
} from "../../Components/Dialog/Confirmation";
import ButtonDel from "../../Components/ButtonDel";
import { TEXT_DELETE_TANQUES } from "../../constants/dialogs/text";

const Tanque = () => {
  const dispatch = useDispatch();

  const refDialogConfDel = useRef<DialogConfirmationRef | null>(null);

  const { tanques, onDelete } = useTanque(undefined, true);

  const [rowsSelection, setRowsSelection] =
    useState<GridInputRowSelectionModel>([]);

  dispatch(TanquesActive());

  const customFotoRender = (value: string) => {
    return (
      <div className="container-img-tanque">
        <img className="img-tanque" src={value} alt="Foto" />
      </div>
    );
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
      rowsSelection.forEach((tanqueId: number) => {
        onDelete(tanqueId).then((resp) => {
          if (resp) {
            setRowsSelection((prev) => {
              if (Array.isArray(prev)) {
                prev = prev.filter((f) => f !== tanqueId);
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
      field: "TanqueId",
      headerName: "ID",
      filterable: true,
      sortable: true,
      flex: 0.5,
    },
    {
      field: "FotoPath",
      headerName: "Foto",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customFotoRender(params.row.FotoPath);
      },
      flex: 1,
    },
    {
      field: "Capacidade",
      headerName: "Capacidade (L)",
      filterable: true,
      sortable: true,
      flex: 2,
    },
    {
      field: "Marca",
      headerName: "Marca",
      filterable: true,
      sortable: true,
      flex: 2
    },
    {
      field: "acoes",
      headerName: "Ações",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customAcoesRender(params.row.TanqueId);
      },
      flex: 1
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
          text={TEXT_DELETE_TANQUES}
          onCancelText="Não"
          onOkText="Sim"
          onOk={onOkConfDel}
        />

        <Container>
          <DataGrid
            onRowSelectionModelChange={(rows) => setRowsSelection(rows)}
            rowSelectionModel={rowsSelection}
            rows={tanques}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.TanqueId}
            pageSizeOptions={[5]}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </Container>
      </Main>
      <ButtonAdd to="/tanque/create" />
      <Footer />
    </>
  );
};

export default Tanque;
