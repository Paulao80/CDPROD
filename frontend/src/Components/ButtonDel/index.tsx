import "./style.css";
import { DeleteOutlined } from "@mui/icons-material";

interface ButtonDelProps {
  onClick(): void;
}

function ButtonDel({ onClick }: ButtonDelProps) {
  return (
    <button className="btn-del" onClick={onClick}>
      <DeleteOutlined fontSize="small" />
    </button>
  );
}

export default ButtonDel;
