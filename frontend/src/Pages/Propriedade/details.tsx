import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnEdt from '../../Components/ButtonEdt';
import PainelNav from '../../Components/PainelNav';
import { useParams } from 'react-router-dom';
import ShowData from '../../Components/ShowData';
import { Props } from '../../Types';
import { Propriedade, Produtor } from '../../Interfaces';
import { useEffect, useState } from 'react';
import Api from '../../Services/Api';

interface Param {
    id: string;
}

const DetailsPropriedade = ({ Logo, UserImg, Responsive, BtnState, HambClick }: Props) => {
    const { id } = useParams<Param>();

    const [propriedade, setPropriedade] = useState<Propriedade>({ Produtor: {} } as Propriedade);

    useEffect(() => {
        Api.get(`/propriedades/${id}`).then(response => {
            setPropriedade(response.data);
        });
    }, []);

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