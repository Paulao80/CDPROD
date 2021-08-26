import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnSave from '../../Components/ButtonSave';
import { TextField, MenuItem } from '@material-ui/core';
import { CpfMaskCustom, CnpjMaskCustom, RgMaskCustom } from '../../Util/Mask';
import { useState } from 'react';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

const CreateProdutor = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {

    const OnBtnSave = () => {

    }

    const [inputComponent, setinputComponent] = useState({
        inputComponent: CpfMaskCustom as any,
    });

    const [tipoPessoa, setTipoPessoa] = useState(1);

    const OnTipoPessoaChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(evt.target.value);
        setTipoPessoa(value);
        if (value === 1) {
            setinputComponent({
                inputComponent: CpfMaskCustom as any,
            });
        }
        else {
            setinputComponent({
                inputComponent: CnpjMaskCustom as any,
            });
        }
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="produtor" responsive={Responsive} />
            <Main>
                <Container>
                    <TextField name="Nome" id="Nome" label="Nome" variant="outlined" fullWidth required />
                    {/* DataNasc */}
                    <TextField name="TipoPessoa" id="TipoPessoa" label="Tipo de Pessoa" variant="outlined" select fullWidth required value={tipoPessoa} onChange={OnTipoPessoaChange}>
                        <MenuItem key={1} value={1}>
                            Física
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                            Jurídica
                        </MenuItem>
                    </TextField>
                    <TextField name="Nacionalidade" id="Nacionalidade" label="Nacionalidade" variant="outlined" fullWidth required />
                    <TextField
                        name="CpfCnpj"
                        id="CpfCnpj"
                        label="CPF/CNPJ"
                        variant="outlined"
                        InputProps={inputComponent}
                        fullWidth
                        required
                    />
                    <TextField name="RG" id="RG" label="RG" variant="outlined" InputProps={{
                        inputComponent: RgMaskCustom as any,
                    }} fullWidth required />

                </Container>
            </Main>
            <BtnSave OnBtnClick={OnBtnSave} />
            <Footer />
        </>
    );
}

export default CreateProdutor;