import "./style.css";
import { useParams } from "react-router-dom";
import PropriedadeContent from "../../PagesContents/PropriedadeContent";

interface Param {
  id: string;
}

const EditPropriedade = () => {
  const { id } = useParams<Param>();

  return PropriedadeContent(id ? Number(id) : undefined);
};

export default EditPropriedade;
