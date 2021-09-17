import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnSave from '../../Components/ButtonSave';
import { TextField, MenuItem } from '@material-ui/core';
import { CpfMaskCustom, CnpjMaskCustom, RgMaskCustom, TelefoneMaskCustom } from '../../Util/Mask';
import { useState, useEffect, FormEvent } from 'react';
import ApiUf from '../../Services/ApiUf';
import Api from '../../Services/Api';
import PainelNav from '../../Components/PainelNav';
import { Uf } from '../../Interfaces';
import { useHistory } from 'react-router-dom';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

const CreateProdutor = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const history = useHistory();

    const [ufs, setUfs] = useState<Uf[]>([]);

    useEffect(() => {
        ApiUf.get('/localidades/estados', {
            params: {
                orderBy: "nome"
            }
        }).then(response => {
            setUfs(response.data);
        });
    }, []);

    const [inputComponent, setinputComponent] = useState({
        inputComponent: CpfMaskCustom as any,
    });

    const [Nome, setNome] = useState("");
    const [DataNasc, setDataNasc] = useState("");
    const [TipoPessoa, setTipoPessoa] = useState(1);
    const [Nacionalidade, setNacionalidade] = useState("");
    const [CpfCnpj, setCpfCnpj] = useState("");
    const [RG, setRG] = useState("");
    const [OrgaoExp, setOrgaoExp] = useState("");
    const [EstadoExp, setEstadoExp] = useState("");
    const [DataExp, setDataExp] = useState("");
    const [EstadoCivil, setEstadoCivil] = useState(1);
    const [Telefone, setTelefone] = useState("");
    const [UltLaticinio, setUltLaticinio] = useState("");

    const OnSubmit = (event: FormEvent) => {
        event.preventDefault();

        Api.post('/produtores', {
            Nome,
            DataNasc,
            TipoPessoa,
            Nacionalidade,
            CpfCnpj,
            RG,
            OrgaoExp,
            EstadoExp,
            DataExp,
            EstadoCivil,
            Telefone,
            UltLaticinio
        })
            .then((response) => {
                response.status === 201
                    ? redirect()
                    : alert("Não foi possivel adicionar o Produtor");
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const redirect = () => {
        history.push('/produtor');
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="produtor" responsive={Responsive} />
            <Main>
                <PainelNav to="/produtor" titulo="Adicionar Produtor" />

                <Container>

                    <form onSubmit={OnSubmit}>
                        <TextField
                            name="Nome"
                            id="Nome"
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Nome}
                            onChange={event => setNome(event.target.value)}
                        />

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
                            value={DataNasc}
                            onChange={event => setDataNasc(event.target.value)}
                        />

                        <TextField
                            name="TipoPessoa"
                            id="TipoPessoa"
                            label="Tipo de Pessoa"
                            variant="outlined"
                            select
                            fullWidth
                            required
                            margin="normal"
                            value={TipoPessoa ? TipoPessoa : 1}
                            onChange={event => {
                                let value = Number(event.target.value);
                                setTipoPessoa(value);

                                value === 1
                                    ? setinputComponent({
                                        inputComponent: CpfMaskCustom as any,
                                    })
                                    : setinputComponent({
                                        inputComponent: CnpjMaskCustom as any,
                                    });
                            }}
                        >
                            <MenuItem key={1} value={1}>
                                Física
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                                Jurídica
                            </MenuItem>

                        </TextField>

                        <TextField
                            name="Nacionalidade"
                            id="Nacionalidade"
                            label="Nacionalidade"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Nacionalidade}
                            onChange={event => setNacionalidade(event.target.value)}
                        />

                        <TextField
                            name="CpfCnpj"
                            id="CpfCnpj"
                            label="CPF/CNPJ"
                            variant="outlined"
                            InputProps={inputComponent}
                            fullWidth
                            required
                            margin="normal"
                            value={CpfCnpj}
                            onChange={event => setCpfCnpj(event.target.value)}
                        />

                        <TextField
                            name="RG"
                            id="RG"
                            label="RG"
                            variant="outlined"
                            InputProps={{
                                inputComponent: RgMaskCustom as any,
                            }}
                            fullWidth
                            required
                            margin="normal"
                            value={RG}
                            onChange={event => setRG(event.target.value)}
                        />

                        <TextField
                            name="OrgaoExp"
                            id="OrgaoExp"
                            label="Orgão de Expedição"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={OrgaoExp}
                            onChange={event => setOrgaoExp(event.target.value)}
                        />

                        <TextField
                            name="EstadoExp"
                            id="EstadoExp"
                            label="Estado de Expediçaõ"
                            variant="outlined"
                            select
                            fullWidth
                            required
                            margin="normal"
                            value={EstadoExp ? EstadoExp : ""}
                            onChange={event => setEstadoExp(event.target.value)}
                        >

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
                            value={DataExp}
                            onChange={event => setDataExp(event.target.value)}
                        />

                        <TextField
                            name="EstadoCivil"
                            id="EstadoCivil"
                            label="Estado Civil"
                            variant="outlined"
                            select
                            fullWidth
                            required
                            margin="normal"
                            value={EstadoCivil ? EstadoCivil : 1}
                            onChange={event => setEstadoCivil(Number(event.target.value))}
                        >

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

                        <TextField
                            name="Telefone"
                            id="Telefone"
                            label="Telefone"
                            variant="outlined"
                            InputProps={{
                                inputComponent: TelefoneMaskCustom as any,
                            }}
                            fullWidth
                            required
                            margin="normal"
                            value={Telefone}
                            onChange={event => setTelefone(event.target.value)}
                        />

                        <TextField
                            name="UltLaticinio"
                            id="UltLaticinio"
                            label="Último Laticinio"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={UltLaticinio}
                            onChange={event => setUltLaticinio(event.target.value)}
                        />

                        <BtnSave />
                    </form>

                </Container>
            </Main>

            <Footer />
        </>
    );
}

export default CreateProdutor;