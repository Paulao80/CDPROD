import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAction, openModalAction } from "../Actions/ModalActions";
import { Reducers, TypeModal } from "../Interfaces";

interface UseModal {
  modals: TypeModal[];
  isModalOpen(key: string): boolean;
  openModal(modal: TypeModal): void;
  closeModal(key: string): void;
}

const useModal = (): UseModal => {
  const dispatch = useDispatch();
  const state = useSelector((state: Reducers) => {
    return state.ModalStateReducer;
  });

  const [modals, setModals] = useState<TypeModal[]>([]);

  useEffect(() => {
    setModals(state.modals);
  }, [state.modals]);

  function isModalOpen(key: string): boolean {
    return modals.find((item) => item.key === key) !== undefined;
  }

  function openModal(modal: TypeModal): void {
    dispatch(openModalAction(modals, modal));
  }

  function closeModal(key: string): void {
    const modal = modals.find((item) => {
      return item.key === key;
    });

    if (modal) dispatch(closeModalAction(modals, modal));
  }

  return { modals, isModalOpen, openModal, closeModal };
};

export default useModal;
