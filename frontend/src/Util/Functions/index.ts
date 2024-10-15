import { FormInstance } from "rc-field-form";
import { ChangeEvent, SetStateAction } from "react";
import { Data } from "../../Types";
import dayjs from "dayjs";

export const GetTipoPessoa = (tipo?: number) => {
  switch (tipo) {
    case 1:
      return "Física";
    case 2:
      return "Jurídica";
    default:
      return "Erro";
  }
};

export const GetEstadoCivil = (estado?: number) => {
  switch (estado) {
    case 1:
      return "Solteiro(a)";
    case 2:
      return "Casado(a)";
    case 3:
      return "Separado(a)";
    case 4:
      return "Divorciado(a)";
    case 5:
      return "Viúvo(a)";
    default:
      return "Erro";
  }
};

export const GetTipoTanque = (tipo?: number) => {
  switch (tipo) {
    case 1:
      return "Individual";
    case 2:
      return "Comunitário";
    default:
      return "Erro";
  }
};

export const GetSimNao = (value: boolean) => {
  if (value) return "Sim";

  return "Não";
};

export const formatValueToBool = (value: any) => {
  if (typeof value === "boolean") return value;

  if (value === 1) return true;

  if (value === "true") return true;

  return false;
};

export const IsBlank = (value: any) => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (typeof value === "number" && Number.isNaN(value))
  )
    return true;

  return false;
};

export const SetFormData = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setForm: (value: SetStateAction<any>) => void,
  Convert?: (value?: any) => any
) => {
  setForm((prev: any) => {
    return {
      ...prev,
      [event.target.name]:
        Convert !== undefined
          ? Convert(event.target.value)
          : event.target.value,
    };
  });
};

export const formContainsError = async (form: FormInstance<any>) => {
  if (form) {
    return await form
      .validateFields()
      .then(() => {
        return false;
      })
      .catch(() => {
        return true;
      });
  }

  return false;
};

export const formatDataBrazil = (data?: Data) => {
  if(data === null || data === undefined) return null;
  return dayjs(data).format("DD/MM/YYYY");
};
