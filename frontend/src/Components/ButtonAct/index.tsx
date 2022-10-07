import { Link } from "react-router-dom";
import "./style.css";
import { People, Edit, List, AccountBalance } from "@material-ui/icons";
import useModal from "../../Hooks/useModal";
import { TypeModal } from "../../Interfaces";

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
        return <People fontSize="medium" />;
      case "editar":
        return <Edit fontSize="medium" />;
      case "detalhes":
        return <List fontSize="medium" />;
      case "contas":
        return <AccountBalance fontSize="medium" />;
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
