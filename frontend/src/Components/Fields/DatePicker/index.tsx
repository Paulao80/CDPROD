import { DatePicker } from "@mui/x-date-pickers";
import { Meta } from "rc-field-form/es/interface";
import { Error } from "../../../Interfaces";

type DatePickerProps = React.ComponentProps<typeof DatePicker>;

type DatePickerXProps = DatePickerProps & {
  meta?: Meta;
  errorForm?: Error<any>;
};

export const DatePickerX = ({
  value,
  meta,
  errorForm,
  ...props
}: DatePickerXProps) => {
  return (
    <>
      <DatePicker
        value={value}
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
};
