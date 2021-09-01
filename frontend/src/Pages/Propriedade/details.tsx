import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnEdt from '../../Components/ButtonEdt';
import PainelNav from '../../Components/PainelNav';
import { useParams } from 'react-router-dom';
import { PropriedadesData } from '../../Util/Data';
import ShowData from '../../Components/ShowData';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

interface Param {
    id: string;
}

const DetailsPropriedade = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const { id } = useParams<Param>();

    const propriedade = PropriedadesData.filter(obj => obj.PropriedadeId === parseInt(id))[0];

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="propriedade" responsive={Responsive} />
            <Main>
                <PainelNav to="/propriedade" titulo="Detalhes da Propriedade" />
                <Container>
                    <ShowData Label="Id" Data={propriedade.PropriedadeId} />
                    <ShowData Label="NIRF" Data={propriedade.Nirf} />
                    <ShowData Label="Nome" Data={propriedade.Nome} />
                    <ShowData Label="Inscrição" Data={propriedade.InscEstadual} />
                    <ShowData Label="Endereço" Data={propriedade.Endereco} />
                    <ShowData Label="Municipio" Data={propriedade.Municipio} />
                    <ShowData Label="Estado" Data={propriedade.Estado} />
                    <ShowData Label="Produtor" Data={propriedade.Produtor.Nome} />
                </Container>
            </Main>
            <BtnEdt to={`/propriedade/edit/${propriedade.PropriedadeId}`} />
            <Footer />
        </>
    );
}

export default DetailsPropriedade;