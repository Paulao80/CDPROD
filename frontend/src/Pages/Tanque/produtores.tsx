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
import {
  DataGrid,
  GridColDef,
  GridInputRowSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
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
import { useCallback, useMemo, useRef, useState } from "react";
import DialogConfirmation, {
  DialogConfirmationRef,
} from "../../Components/Dialog/Confirmation";
import ButtonDel from "../../Components/ButtonDel";
import { TEXT_DELETE_PRODUTORES } from "../../constants/dialogs/text";

const ProdutoresTanques = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const refDialogConfDel = useRef<DialogConfirmationRef | null>(null);

  const { openModal } = useModal();
  const { produtores } = useProdutor(undefined, true);
  const { produtoresTanques, form, onFinish, errorForm, onDelete } =
    useProdutorTanque(id ? Number(id) : undefined, true);

  const [rowsSelection, setRowsSelection] =
    useState<GridInputRowSelectionModel>([]);

  dispatch(TanquesActive());

  const handleOpen = () => {
    openModal({
      key: KEY_M_PRODUTORTANQUES,
      title: TITLE_M_ADD_PRODUTORTANQUES,
      operation: OperationModal.Add,
    });
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
      rowsSelection.forEach((prodTanqueId: number) => {
        onDelete(prodTanqueId).then((resp) => {
          if (resp) {
            setRowsSelection((prev) => {
              if (Array.isArray(prev)) {
                prev = prev.filter((f) => f !== prodTanqueId);
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
      renderCell: (params) => {
        return params.row.Produtor.ProdutorId;
      },
      flex: 0.5,
    },
    {
      field: "ProdutorNome",
      headerName: "Nome",
      filterable: true,
      sortable: true,
      renderCell: (params) => {
        return params.row.Produtor.Nome;
      },
      flex: 2,
    },
    {
      field: "ProdutorCpfCnpj",
      headerName: "CPF/CNPJ",
      filterable: true,
      sortable: true,
      renderCell: (params) => {
        return params.row.Produtor.CpfCnpj;
      },
      flex: 1,
    },
    {
      field: "Responsavel",
      headerName: "Responsavel",
      filterable: true,
      sortable: false,
      renderCell: (params) => {
        return GetSimNao(params.row.Responsavel);
      },
      flex: 0.75,
    },
  ];

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <PainelNav to={`/tanque`} titulo="Produtores" />

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
            rows={produtoresTanques}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.ProdutorTanqueId}
            pageSizeOptions={[5]}
            slots={{
              toolbar: CustomToolbar,
            }}
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
