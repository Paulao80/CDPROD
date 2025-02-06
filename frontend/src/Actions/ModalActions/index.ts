import { TypeModal } from "../../Interfaces";
import { Action } from "../../Reducers/Modal";

export const openModalAction = (
  atual: TypeModal[],
  novo: TypeModal
): Action => {
  if (atual.find((item) => item.key === novo.key) === undefined)
    atual.push(novo);

  return {
    type: "CHANGE_MODAL",
    payload: {
      modals: atual,
    },
  };
};

export const closeModalAction = (
  atual: TypeModal[],
  remove: TypeModal
): Action => {
  const novo = atual.filter((item) => item.key !== remove.key);
  return {
    type: "CHANGE_MODAL",
    payload: {
      modals: novo,
    },
  };
};
