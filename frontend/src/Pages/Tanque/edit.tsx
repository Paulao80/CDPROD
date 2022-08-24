import { useParams } from "react-router-dom";
import TanqueContent from "../../PagesContents/TanqueContent";
import "./style.css";

interface Param {
  id: string;
}

const EditTanque = () => {
  const { id } = useParams<Param>();
  return TanqueContent(id ? Number(id) : undefined);
};

export default EditTanque;
