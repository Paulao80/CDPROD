import { ChangeEvent, SetStateAction } from "react";

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

export const GetTipoTanque = (tipo: number) => {
  switch (tipo) {
    case 1:
      return "Individual";
    case 2:
      return "Comunitário";
    default:
      return "Erro";
  }
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


