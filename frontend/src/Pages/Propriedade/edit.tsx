import "./style.css";
import { useParams } from "react-router-dom";
import PropriedadeContent from "../../PagesContents/PropriedadeContent";

const EditPropriedade = () => {
  const { id } = useParams();

  return PropriedadeContent(id ? Number(id) : undefined);
};

export default EditPropriedade;
