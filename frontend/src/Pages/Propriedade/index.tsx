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
import { TEXT_DELETE_PROPRIEDADES } from "../../constants/dialogs/text";

const Propriedade = () => {
  const dispatch = useDispatch();

  const refDialogConfDel = useRef<DialogConfirmationRef | null>(null);

  const { propriedades, onDelete } = usePropriedade(undefined, true);
  const [rowsSelection, setRowsSelection] =
    useState<GridInputRowSelectionModel>([]);

  dispatch(PropriedadesActive());

  const customAcoesRender = (value: string) => {
    return (
      <div className="div-act">
        <ButtonAct to={`/propriedade/edit/${value}`} type="editar" />
        <ButtonAct to={`/propriedade/details/${value}`} type="detalhes" />
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
      rowsSelection.forEach((propriedadeId: number) => {
        onDelete(propriedadeId).then((resp) => {
          if (resp) {
            setRowsSelection((prev) => {
              if (Array.isArray(prev)) {
                prev = prev.filter((f) => f !== propriedadeId);
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
      field: "PropriedadeId",
      headerName: "ID",
      filterable: true,
      sortable: true,
      flex: 0.5,
    },
    {
      field: "Nirf",
      headerName: "NIRF",
      filterable: true,
      sortable: true,
      flex: 1,
    },
    {
      field: "Nome",
      headerName: "Nome",
      filterable: true,
      sortable: true,
      flex: 2,
    },
    {
      field: "Produtor",
      headerName: "Produtor",
      filterable: true,
      sortable: true,
      renderCell: (params) => {
        return params.row.Produtor.Nome;
      },
      flex: 2,
    },
    {
      field: "acoes",
      headerName: "Ações",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customAcoesRender(params.row.PropriedadeId);
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
          text={TEXT_DELETE_PROPRIEDADES}
          onCancelText="Não"
          onOkText="Sim"
          onOk={onOkConfDel}
        />

        <Container>
          <DataGrid
            onRowSelectionModelChange={(rows) => setRowsSelection(rows)}
            rowSelectionModel={rowsSelection}
            rows={propriedades}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.PropriedadeId}
            pageSizeOptions={[5]}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </Container>
      </Main>
      <ButtonAdd to="/propriedade/create" />
      <Footer />
    </>
  );
};

export default Propriedade;
