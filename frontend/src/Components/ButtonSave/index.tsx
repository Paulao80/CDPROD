import './style.css';
import { Save } from '@material-ui/icons';

type props = {
    OnBtnClick: Function;
}

const ButtonAdd = ({ OnBtnClick }: props) => {
    return (
        <button className="btn-save" onClick={() => OnBtnClick()}><Save fontSize="large" /></button>
    );
}

export default ButtonAdd;