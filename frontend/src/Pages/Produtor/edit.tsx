import './style.css';
import { useParams } from 'react-router-dom';
import ProdutorContent from '../../PagesContents/ProdutorContent';

interface Param {
    id?: string;
}

const EditProdutor = () => {
    const { id } = useParams<Param>();

    return ProdutorContent(id ? Number(id) : undefined);
}

export default EditProdutor;