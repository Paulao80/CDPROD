import { Link } from "react-router-dom";
import "./style.css";
import useModal from "../../Hooks/useModal";
import { TypeModal } from "../../Interfaces";
import { AccountBalance, Edit, List, People } from "@mui/icons-material";

type props = {
  to?: string;
  type: string;
  toOpenModal?: boolean;
  row?: any;
  modal?: TypeModal;
  setFormData?(data: any): void;
};

const ButtonAct = ({
  to,
  type,
  toOpenModal,
  setFormData,
  row,
  modal,
}: props) => {
  const { openModal } = useModal();

  const GetIconType = (type: string) => {
    switch (type) {
      case "produtores":
        return <People fontSize="small" />;
      case "editar":
        return <Edit fontSize="small" />;
      case "detalhes":
        return <List fontSize="small" />;
      case "contas":
        return <AccountBalance fontSize="small" />;
    }
  };

  return toOpenModal ? (
    <button
      className={`btn-act ${type}`}
      onClick={() => {
        if (modal && setFormData) {
          setFormData(row);
          openModal(modal);
        }
      }}
    >
      {GetIconType(type)}
    </button>
  ) : (
    <Link className={`btn-act ${type}`} to={to !== undefined ? to : "/"}>
      {GetIconType(type)}
    </Link>
  );
};

export default ButtonAct;
