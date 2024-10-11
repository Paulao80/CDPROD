import { useParams } from "react-router-dom";
import TanqueContent from "../../PagesContents/TanqueContent";
import "./style.css";

const EditTanque = () => {
  const { id } = useParams();
  return TanqueContent(id ? Number(id) : undefined);
};

export default EditTanque;
