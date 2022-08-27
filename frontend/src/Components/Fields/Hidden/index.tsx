import { Meta } from "rc-field-form/es/interface";
import { Error } from "../../../Interfaces";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type HiddenXProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  meta?: Meta;
  errorForm?: Error<any>;
};

export const HiddenX = ({
  value = "",
  type,
  meta,
  errorForm,
  ...props
}: HiddenXProps) => (
  <>
    <input type={type} value={value} {...props} hidden />

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
