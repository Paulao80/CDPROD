import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnSave from '../../Components/ButtonSave';
import { TextField, MenuItem } from '@material-ui/core';
import { CpfMaskCustom, CnpjMaskCustom, RgMaskCustom, TelefoneMaskCustom } from '../../Util/Mask';
import { useState, useEffect } from 'react';
import ApiUf from '../../Services/ApiUf';
import PainelNav from '../../Components/PainelNav';
import { useParams } from 'react-router-dom';
import { ProdutoresData } from '../../Util/Data'

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

const EditProdutor = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {

    const { id } = useParams<Param>();

    const produtor = ProdutoresData.filter(obj => obj.ProdutorId === parseInt(id))[0];

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

    const OnBtnSave = () => {

    }

    const [inputComponent, setinputComponent] = useState({
        inputComponent: CpfMaskCustom as any,
    });

    const [tipoPessoa, setTipoPessoa] = useState(produtor.TipoPessoa);

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
                <PainelNav to={`/produtor/details/${id}`} titulo="Editar Produtor" />
                <Container>
                    <TextField name="Nome" id="Nome" label="Nome" variant="outlined" fullWidth required margin="normal" value={produtor.Nome} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField
                        name="DataNasc"
                        id="DataNasc"
                        label="Data de Nascimento"
                        type="date"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        required
                        value={produtor.DataNasc}
                    />
                    <TextField name="TipoPessoa" id="TipoPessoa" label="Tipo de Pessoa" variant="outlined" select fullWidth required value={tipoPessoa} onChange={OnTipoPessoaChange} margin="normal">
                        <MenuItem key={1} value={1}>
                            Física
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                            Jurídica
                        </MenuItem>
                    </TextField>
                    <TextField name="Nacionalidade" id="Nacionalidade" label="Nacionalidade" variant="outlined" fullWidth required margin="normal" value={produtor.Nacionalidade} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField
                        name="CpfCnpj"
                        id="CpfCnpj"
                        label="CPF/CNPJ"
                        variant="outlined"
                        InputProps={inputComponent}
                        fullWidth
                        required
                        margin="normal"
                        value={produtor.CpfCnpj}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField name="RG" id="RG" label="RG" variant="outlined" InputProps={{
                        inputComponent: RgMaskCustom as any,
                    }} fullWidth required margin="normal" value={produtor.RG} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField name="OrgaoExp" id="OrgaoExp" label="Orgão de Expedição" variant="outlined" fullWidth required margin="normal" value={produtor.OrgaoExp} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField name="EstadoExp" id="EstadoExp" label="Estado de Expediçaõ" variant="outlined" select fullWidth required margin="normal" value={produtor.EstadoExp}>
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
                    <TextField
                        name="DataExp"
                        id="DataExp"
                        label="Data de Expedição"
                        type="date"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        required
                        value={produtor.DataExp}
                    />
                    <TextField name="EstadoCivil" id="EstadoCivil" label="Estado Civil" variant="outlined" select fullWidth required margin="normal" value={produtor.EstadoCivil}>
                        <MenuItem key={1} value={1}>
                            solteiro(a)
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                            casado(a)
                        </MenuItem>
                        <MenuItem key={3} value={3}>
                            separado(a)
                        </MenuItem>
                        <MenuItem key={4} value={4}>
                            divorciado(a)
                        </MenuItem>
                        <MenuItem key={5} value={5}>
                            viúvo(a)
                        </MenuItem>
                    </TextField>
                    <TextField name="Telefone" id="Telefone" label="Telefone" variant="outlined" InputProps={{
                        inputComponent: TelefoneMaskCustom as any,
                    }} fullWidth required margin="normal" value={produtor.Telefone} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField name="UltLaticinio" id="UltLaticinio" label="Último Laticinio" variant="outlined" fullWidth margin="normal" value={produtor.UltLaticinio} InputLabelProps={{
                        shrink: true,
                    }} />


                </Container>
            </Main>
            <BtnSave OnBtnClick={OnBtnSave} />
            <Footer />
        </>
    );
}

export default EditProdutor;