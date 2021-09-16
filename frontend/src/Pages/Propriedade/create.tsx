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
import { ProdutoresData } from '../../Util/Data';
import { Uf } from '../../Interfaces';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

const CreatePropriedade = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {

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
                <PainelNav to="/propriedade" titulo="Adicionar Propriedade" />
                <Container>
                    <TextField name="Nirf" id="Nirf" label="NIRF" variant="outlined" InputProps={{
                        inputComponent: NirfMaskCustom as any,
                    }} fullWidth required margin="normal" />
                    <TextField name="Nome" id="Nome" label="Nome" variant="outlined" fullWidth required margin="normal" />
                    <TextField name="InscEstadual" id="InscEstadual" label="Inscrição Estadual" variant="outlined" fullWidth required margin="normal" />
                    <TextField name="Endereco" id="Endereco" label="Endereço" variant="outlined" fullWidth required margin="normal" />
                    <TextField name="Municipio" id="Municipio" label="Municipio" variant="outlined" fullWidth required margin="normal" />
                    <TextField name="Estado" id="Estado" label="Estado" variant="outlined" select fullWidth required margin="normal">
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
                </Container>
            </Main>
            <BtnSave />
            <Footer />
        </>
    );
}

export default CreatePropriedade;