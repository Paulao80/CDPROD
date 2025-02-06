import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

export interface DialogConfirmationProps {
  text: string;
  onOk?(): void;
  onCancel?(): void;
  onOkText?: string;
  onCancelText?: string;
}

export interface DialogConfirmationRef {
  setOpen(value: boolean): void;
}

const DialogConfirmation = forwardRef<
  DialogConfirmationRef,
  DialogConfirmationProps
>((props, ref) => {
  const {
    text,
    onCancelText = "Cancelar",
    onOkText = "OK",
    onCancel,
    onOk,
  } = props;
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({ setOpen }));

  function callbackActions(action?: () => void) {
    setOpen(false);
    action?.();
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Confirmação</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => callbackActions(onCancel)}>
          {onCancelText}
        </Button>
        <Button onClick={() => callbackActions(onOk)}>{onOkText}</Button>
      </DialogActions>
    </Dialog>
  );
});

export default DialogConfirmation;
