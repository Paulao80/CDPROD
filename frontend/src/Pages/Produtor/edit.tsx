import './style.css';
import { useParams } from 'react-router-dom';
import ProdutorContent from '../../PagesContents/ProdutorContent';

const EditProdutor = () => {
    const { id } = useParams();

    return ProdutorContent(id ? Number(id) : undefined);
}

export default EditProdutor;