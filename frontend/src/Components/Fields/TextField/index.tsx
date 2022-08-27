import { TextField, TextFieldProps } from "@mui/material";
import { Meta } from "rc-field-form/es/interface";
import { IsBlank } from "../../../Util/Functions";
import { Error } from "../../../Interfaces";

type TextFieldXProps = TextFieldProps & {
  meta?: Meta;
  errorForm?: Error<any>;
};

export const TextFieldX = ({
  value = "",
  InputLabelProps,
  type,
  meta,
  errorForm,
  ...props
}: TextFieldXProps) => (
  <>
    <TextField
      type={type}
      value={value}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: !IsBlank(value) || type === "date",
      }}
      {...props}
    />

    {meta !== undefined &&
    errorForm?.errors !== undefined &&
    errorForm.errors[meta.name.toString()] !== undefined ? (
      <div className="Message-error">
        <p>{errorForm.errors[meta.name.toString()]}</p>
      </div>
    ) : meta?.errors !== undefined && meta.errors.length > 0 ? (
      <div className="Message-error">
        <p>{meta.errors}</p>
      </div>
    ) : (
      ""
    )}
  </>
);
