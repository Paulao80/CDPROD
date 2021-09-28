import './style.css';

type props = {
    titulo: string;
}

const Painel = ({ titulo }: props) => {
    return (
        <div className="painel">
            <label className="lbl-title">{titulo}</label>
        </div>
    );
}

export default Painel;