import "./style.css";
import { MouseEventHandler } from "react";
import { FormInstance } from "rc-field-form";
import { formContainsError } from "../../Util/Functions";
import { Save } from "@mui/icons-material";

interface ButtonAddProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  form?: FormInstance<any>;
}

const ButtonAdd = ({ onClick, form }: ButtonAddProps) => {
  return (
    <button
      onClick={async (event) => {
        if (form && onClick) {
          if (!(await formContainsError(form))) onClick(event);
        } else if (onClick) {
          onClick(event);
        }
      }}
      type="button"
      className="btn-save"
    >
      <Save fontSize="large" />
    </button>
  );
};

export default ButtonAdd;
