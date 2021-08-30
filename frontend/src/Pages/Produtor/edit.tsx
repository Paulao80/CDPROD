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

    const data = [
        {
            ProdutorId: 1,
            Nome: "Paulo Vinicius Costa Nogueira",
            DataNasc: "1997-09-19",
            TipoPessoa: 1,
            Nacionalidade: "Brasileiro",
            CpfCnpj: "02747861252",
            RG: "1281291",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2011-11-11",
            EstadoCivil: 1,
            Telefone: "69992642095",
            UltLaticinio: null
        },
        {
            ProdutorId: 2,
            Nome: "João das Neves Gomez",
            DataNasc: "1998-08-15",
            TipoPessoa: 1,
            Nacionalidade: "Brasileiro",
            CpfCnpj: "02847861252",
            RG: "1281295",
            OrgaoExp: "SESDC",
            EstadoExp: "SP",
            DataExp: "2012-08-12",
            EstadoCivil: 1,
            Telefone: "69993652196",
            UltLaticinio: null
        },
        {
            ProdutorId: 3,
            Nome: "Carlos de Oliveira da Silva",
            DataNasc: "1987-05-20",
            TipoPessoa: 1,
            Nacionalidade: "Brasileiro",
            CpfCnpj: "36562152547",
            RG: "1052672",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2005-02-15",
            EstadoCivil: 1,
            Telefone: "69993722558",
            UltLaticinio: null
        },
        {
            ProdutorId: 4,
            Nome: "Miguel Ramirez Santos",
            DataNasc: "1981-06-02",
            TipoPessoa: 1,
            Nacionalidade: "Boliviano",
            CpfCnpj: "26662152547",
            RG: "1072672",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2002-03-20",
            EstadoCivil: 1,
            Telefone: "69993752558",
            UltLaticinio: null
        },
        {
            ProdutorId: 5,
            Nome: "Rodrigo Damacena Sanchez",
            DataNasc: "1990-08-10",
            TipoPessoa: 1,
            Nacionalidade: "Brasileiro",
            CpfCnpj: "31562152547",
            RG: "1182672",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2008-04-02",
            EstadoCivil: 1,
            Telefone: "69993796558",
            UltLaticinio: null
        },
        {
            ProdutorId: 6,
            Nome: "Peter Parker",
            DataNasc: "1985-10-12",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "38777766622",
            RG: "1222222",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2000-05-05",
            EstadoCivil: 1,
            Telefone: "69993896698",
            UltLaticinio: null
        },
        {
            ProdutorId: 7,
            Nome: "Anakin Skywalker",
            DataNasc: "1965-03-15",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "36775566622",
            RG: "1223223",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "1990-05-05",
            EstadoCivil: 1,
            Telefone: "69993907628",
            UltLaticinio: null
        },
        {
            ProdutorId: 8,
            Nome: "Luke Skywalker",
            DataNasc: "1985-05-25",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "37775566822",
            RG: "1226253",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "1995-06-05",
            EstadoCivil: 1,
            Telefone: "69999907628",
            UltLaticinio: null
        },
        {
            ProdutorId: 9,
            Nome: "Bruce Wayne",
            DataNasc: "1980-02-12",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "39776466822",
            RG: "1236553",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "1997-07-02",
            EstadoCivil: 1,
            Telefone: "69993914928",
            UltLaticinio: null
        },
        {
            ProdutorId: 10,
            Nome: "Oliver Queen",
            DataNasc: "1983-03-15",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "39986456822",
            RG: "1346953",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "1997-07-02",
            EstadoCivil: 1,
            Telefone: "69993925998",
            UltLaticinio: null
        }
    ];

    const { id } = useParams<Param>();

    const produtor = data.filter(obj => obj.ProdutorId === parseInt(id))[0];

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