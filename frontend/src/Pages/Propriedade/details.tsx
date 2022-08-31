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
import { Propriedade } from '../../Interfaces';
import { useEffect, useState } from 'react';
import Logo from '../../Assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { PropriedadesActive } from '../../Actions/PageActiveActions';
import usePropriedade from '../../Hooks/usePropriedade';

interface Param {
    id: string;
}

const DetailsPropriedade = () => {
    const { id } = useParams<Param>();
    const dispatch = useDispatch();
    const { getById } = usePropriedade();
    const [propriedade, setPropriedade] = useState<Propriedade>();

    useEffect(() => {
        if(id)
            getById(Number(id)).then((res) => {
                if(res) setPropriedade(res);
            });
    }, [id, getById]);

    dispatch(PropriedadesActive());  

    if (propriedade === undefined) {
        return (
            <p>Carregando...</p>
        )
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
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
                    <ShowData Label="Produtor" Data={propriedade?.Produtor?.Nome} />
                </Container>
            </Main>
            <BtnEdt to={`/propriedade/edit/${propriedade.PropriedadeId}`} />
            <Footer />
        </>
    );
}

export default DetailsPropriedade;