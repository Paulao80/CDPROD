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
import {
  DataGrid,
  GridColDef,
  GridInputRowSelectionModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import ModalX from "../../Components/Modal";
import useModal from "../../Hooks/useModal";
import { OperationModal } from "../../Interfaces";
import Form, { Field } from "rc-field-form";
import { HiddenX, TextFieldX } from "../../Components/Fields";
import ButtonAct from "../../Components/ButtonAct";
import { KEY_M_CONTASBANCARIAS } from "../../constants/modals/keys";
import {
  TITLE_M_ADD_CONTASBANCARIAS,
  TITLE_M_EDT_CONTASBANCARIAS,
} from "../../constants/modals/titles";
import { useCallback, useMemo, useRef, useState } from "react";
import ButtonDel from "../../Components/ButtonDel";
import DialogConfirmation, {
  DialogConfirmationRef,
} from "../../Components/Dialog/Confirmation";
import { TEXT_DELETE_CONTAS } from "../../constants/dialogs/text";

const Contas = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const refDialogConfDel = useRef<DialogConfirmationRef | null>(null);

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
    onDelete,
  } = useContaBancaria(id ? Number(id) : undefined, true);

  const [rowsSelection, setRowsSelection] =
    useState<GridInputRowSelectionModel>([]);

  dispatch(ProdutoresActive());

  const handleOpen = () => {
    openModal({
      key: KEY_M_CONTASBANCARIAS,
      title: TITLE_M_ADD_CONTASBANCARIAS,
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
            key: KEY_M_CONTASBANCARIAS,
            operation: OperationModal.Edit,
            title: TITLE_M_EDT_CONTASBANCARIAS,
          }}
        />
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
      rowsSelection.forEach((contaId: number) => {
        onDelete(contaId).then((resp) => {
          if (resp) {
            setRowsSelection((prev) => {
              if (Array.isArray(prev)) {
                prev = prev.filter((f) => f !== contaId);
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
      field: "ContaId",
      headerName: "ID",
      filterable: true,
      sortable: true,
      flex: 0.5,
    },
    {
      field: "NomePertence",
      headerName: "Nome",
      filterable: true,
      sortable: true,
      flex: 2,
    },
    {
      field: "Banco",
      headerName: "Banco",
      filterable: true,
      sortable: true,
      flex: 1,
    },
    {
      field: "Agencia",
      headerName: "Agencia",
      filterable: true,
      sortable: true,
      flex: 1,
    },
    {
      field: "Conta",
      headerName: "Conta",
      filterable: true,
      sortable: true,
      flex: 1,
    },
    {
      field: "acoes",
      headerName: "Ações",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return customAcoesRender(params.row);
      },
      flex: 0.5,
    },
  ];

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <PainelNav to={`/produtor`} titulo="Contas" />

        <DialogConfirmation
          ref={(el) => {
            refDialogConfDel.current = el;
          }}
          text={TEXT_DELETE_CONTAS}
          onCancelText="Não"
          onOkText="Sim"
          onOk={onOkConfDel}
        />

        <Container>
          <DataGrid
            onRowSelectionModelChange={(rows) => setRowsSelection(rows)}
            rowSelectionModel={rowsSelection}
            rows={contasBancarias}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.ContaId}
            pageSizeOptions={[5]}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </Container>
        <ModalX
          keyValue={KEY_M_CONTASBANCARIAS}
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
