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
import { useState, useEffect, FormEvent } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Props } from '../../Types';
import { Produtor, Propriedade, Uf } from '../../Interfaces';
import Api from '../../Services/Api';

interface Param {
    id: string;
}

const EditPropriedade = ({ Logo, UserImg, Responsive, BtnState, HambClick }: Props) => {
    const { id } = useParams<Param>();

    const history = useHistory();

    const [propriedade, setPropriedade] = useState<Propriedade>({ Produtor: {} } as Propriedade);
    const [ufs, setUfs] = useState<Uf[]>([]);
    const [produtores, setProdutores] = useState<Produtor[]>([]);

    useEffect(() => {
        ApiUf.get('/localidades/estados', {
            params: {
                orderBy: "nome"
            }
        }).then(response => {
            console.log(response.data);
            setUfs(response.data);
        });

        Api.get('/produtores')
            .then(response => {
                setProdutores(response.data);
            });

        Api.get(`/propriedades/${id}`).then(response => {
            setPropriedade(response.data);
        });
    }, [id]);

    const [Nirf, setNirf] = useState("");
    const [Nome, setNome] = useState("");
    const [InscEstadual, setInscEstadual] = useState("");
    const [Endereco, setEndereco] = useState("");
    const [Municipio, setMunicipio] = useState("");
    const [Estado, setEstado] = useState("");
    const [ProdutorId, setProdutorId] = useState(1);

    useEffect(() => {
        setNirf(propriedade.Nirf);
        setNome(propriedade.Nome);
        setInscEstadual(propriedade.InscEstadual);
        setEndereco(propriedade.Endereco);
        setMunicipio(propriedade.Municipio);
        setEstado(propriedade.Estado);
        setProdutorId(propriedade.Produtor.ProdutorId)
    }, [propriedade]);

    const OnSubmit = (event: FormEvent) => {
        event.preventDefault();

        Api.put('/propriedades', {
            PropriedadeId: propriedade.PropriedadeId,
            Nirf,
            Nome,
            InscEstadual,
            Endereco,
            Municipio,
            Estado,
            Produtor: {
                ProdutorId
            }
        })
            .then(response => {
                response.status === 200
                    ? history.push('/propriedade')
                    : alert("Não foi possivel atualizar a Propriedade");
            })
            .catch(error => {
                alert("Não foi possivel atualizar a Propriedade");
            });
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="propriedade" responsive={Responsive} />
            <Main>
                <PainelNav to={`/propriedade/details/${id}`} titulo="Editar Propriedade" />
                <Container>

                    <form onSubmit={OnSubmit}>
                        <TextField
                            name="Nirf"
                            id="Nirf"
                            label="NIRF"
                            variant="outlined"
                            InputProps={{
                                inputComponent: NirfMaskCustom as any,
                            }}
                            fullWidth
                            required
                            margin="normal"
                            value={Nirf}
                            onChange={event => setNirf(event.target.value)}
                        />

                        <TextField
                            name="Nome"
                            id="Nome"
                            label="Nome"
                            variant="outlined"
                            fullWidth required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={Nome ? Nome : ""}
                            onChange={event => setNome(event.target.value)}
                        />

                        <TextField
                            name="InscEstadual"
                            id="InscEstadual"
                            label="Inscrição Estadual"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={InscEstadual ? InscEstadual : ""}
                            onChange={event => setInscEstadual(event.target.value)}
                        />

                        <TextField
                            name="Endereco"
                            id="Endereco"
                            label="Endereço"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={Endereco ? Endereco : ""}
                            onChange={event => setEndereco(event.target.value)}
                        />

                        <TextField
                            name="Municipio"
                            id="Municipio"
                            label="Municipio"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={Municipio ? Municipio : ""}
                            onChange={event => setMunicipio(event.target.value)}
                        />

                        <TextField
                            name="Estado"
                            id="Estado"
                            label="Estado"
                            variant="outlined"
                            select fullWidth
                            required
                            margin="normal"
                            value={Estado ? Estado : ""}
                            onChange={event => setEstado(event.target.value)}
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
                            name="ProdutorId"
                            id="ProdutorId"
                            label="Produtor"
                            variant="outlined"
                            select
                            fullWidth
                            required
                            margin="normal"
                            value={ProdutorId ? ProdutorId : 1}
                            onChange={event => setProdutorId(Number(event.target.value))}
                        >

                            {
                                produtores.map(produtor => {
                                    return (
                                        <MenuItem key={produtor.ProdutorId} value={produtor.ProdutorId}>
                                            {produtor.Nome}
                                        </MenuItem>
                                    );
                                })
                            }
                        </TextField>

                        <BtnSave />
                    </form>

                </Container>
            </Main>
            <Footer />
        </>
    );
}

export default EditPropriedade;