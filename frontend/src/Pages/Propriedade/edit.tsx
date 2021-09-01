import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnSave from '../../Components/ButtonSave';
import { TextField, MenuItem } from '@material-ui/core';
import PainelNav from '../../Components/PainelNav';
import { NirfMaskCustom } from '../../Util/Mask';
import ApiUf from '../../Services/ApiUf';
import { useState, useEffect } from 'react';
import { ProdutoresData, PropriedadesData } from '../../Util/Data';
import { useParams } from 'react-router-dom';


type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

interface Uf {
    id: number;
    sigla: string;
    nome: string;
}

interface Param {
    id: string;
}

const EditPropriedade = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const { id } = useParams<Param>();

    const propriedade = PropriedadesData.filter(obj => obj.PropriedadeId === parseInt(id))[0];

    const OnBtnSave = () => {

    }

    const [ufs, setUfs] = useState<Uf[]>([]);

    useEffect(() => {
        ApiUf.get('/localidades/estados', {
            params: {
                orderBy: "nome"
            }
        }).then(response => {
            console.log(response.data);
            setUfs(response.data);
        });
    }, []);

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="propriedade" responsive={Responsive} />
            <Main>
                <PainelNav to={`/propriedade/details/${id}`} titulo="Editar Propriedade" />
                <Container>
                    <TextField name="Nirf" id="Nirf" label="NIRF" variant="outlined" InputProps={{
                        inputComponent: NirfMaskCustom as any,
                    }} fullWidth required margin="normal" value={propriedade.Nirf} />
                    <TextField name="Nome" id="Nome" label="Nome" variant="outlined" fullWidth required margin="normal" value={propriedade.Nome} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField name="InscEstadual" id="InscEstadual" label="Inscrição Estadual" variant="outlined" fullWidth required margin="normal" value={propriedade.InscEstadual} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField name="Endereco" id="Endereco" label="Endereço" variant="outlined" fullWidth required margin="normal" value={propriedade.Endereco} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField name="Municipio" id="Municipio" label="Municipio" variant="outlined" fullWidth required margin="normal" value={propriedade.Municipio} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField name="Estado" id="Estado" label="Estado" variant="outlined" select fullWidth required margin="normal" value={propriedade.Estado}>
                        {
                            ufs.map(uf => {
                                return (
                                    <MenuItem key={uf.id} value={uf.sigla}>
                                        {uf.nome}
                                    </MenuItem>
                                );
                            })
                        }
                    </TextField>
                    <TextField name="ProdutorId" id="ProdutorId" label="Produtor" variant="outlined" select fullWidth required margin="normal" value={propriedade.Produtor.ProdutorId}>
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
                </Container>
            </Main>
            <BtnSave OnBtnClick={OnBtnSave} />
            <Footer />
        </>
    );
}

export default EditPropriedade;