import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnSave from '../../Components/ButtonSave';
import { TextField, MenuItem } from '@material-ui/core';
import PainelNav from '../../Components/PainelNav';
import { ProdutoresData } from '../../Util/Data';
import { useParams } from 'react-router-dom';

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

const AddProdutorTanque = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const { id } = useParams<Param>();

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="tanque" responsive={Responsive} />
            <Main>
                <PainelNav to={`/tanque/produtores/${id}`} titulo="Adicionar Propriedade" />
                <Container>
                    <TextField name="ProdutorId" id="ProdutorId" label="Produtor" variant="outlined" select fullWidth required margin="normal">
                        {
                            ProdutoresData.map(produtor => {
                                return (
                                    <MenuItem key={produtor.ProdutorId} value={produtor.ProdutorId}>
                                        {produtor.Nome}
                                    </MenuItem>
                                );
                            })
                        }
                    </TextField>
                    <TextField name="Responsavel" id="Responsavel" label="Responsavel" variant="outlined" select fullWidth required margin="normal" >
                        <MenuItem key={1} value={1}>
                            Sim
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                            Não
                        </MenuItem>
                    </TextField>
                </Container>
            </Main>
            <BtnSave />
            <Footer />
        </>
    );
}

export default AddProdutorTanque;