import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import useModal from "../../Hooks/useModal";
import { OperationModal, TypeModal } from "../../Interfaces";
import "./style.css";
import CloseIcon from "@mui/icons-material/Close";

interface ModalXProps {
  keyValue: string;
  width?: number | string;
  onFinish?(): Promise<any>;
  onEdit?(): Promise<any>;
  onCancel?(): Promise<any>;
}

const ModalX: React.FC<ModalXProps> = (props) => {
  const { keyValue, children, width, onEdit, onFinish, onCancel } = props;

  const { modals, isModalOpen, closeModal } = useModal();

  const [thisModal, setThisModal] = useState<TypeModal>();
  const [thisModalOpen, setThisModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setThisModal(modals.find((item) => item.key === keyValue));
    setThisModalOpen(isModalOpen(keyValue));
  }, [modals, isModalOpen, keyValue]);

  return (
    <Modal open={thisModalOpen}>
      <div
        className="modal"
        style={{
          width: width ? width : 700,
        }}
      >
        <div className="modal-header">
          <div className="modal-title">{thisModal?.title}</div>
          <button
            className="btn-close"
            onClick={() => {
              closeModal(keyValue);
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            className="btn-operations cancel"
            onClick={async () => {
              closeModal(keyValue);
              if (onCancel) await onCancel();
            }}
          >
            Cancelar
          </button>
          {(thisModal?.operation === OperationModal.Add ||
            thisModal?.operation === OperationModal.Edit) && (
            <button
              className="btn-operations save"
              onClick={async () => {
                if (thisModal?.operation === OperationModal.Add)
                  if (onFinish) await onFinish();

                if (thisModal?.operation === OperationModal.Edit)
                  if (onEdit) await onEdit();
              }}
            >
              Salvar
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalX;
