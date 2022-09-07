import { StateModal } from "../../Interfaces";

export interface Action {
  type: string;
  payload: StateModal;
}

const ModalState = (state: StateModal = { modals: [] }, action: Action) => {
  switch (action.type) {
    case "CHANGE_MODAL":
      return action.payload;
    default:
      return state;
  }
};

export default ModalState;
