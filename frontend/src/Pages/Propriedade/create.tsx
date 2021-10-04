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
import Api from '../../Services/Api';
import { useState, useEffect, FormEvent } from 'react';
import { Uf, Produtor } from '../../Interfaces';
import { useHistory } from 'react-router-dom';
import { Props } from '../../Types';

const CreatePropriedade = ({ Logo, UserImg }: Props) => {
    const history = useHistory();

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
    }, []);

    const [Nirf, setNirf] = useState("");
    const [Nome, setNome] = useState("");
    const [InscEstadual, setInscEstadual] = useState("");
    const [Endereco, setEndereco] = useState("");
    const [Municipio, setMunicipio] = useState("");
    const [Estado, setEstado] = useState("");
    const [ProdutorId, setProdutorId] = useState(1);

    const OnSubmit = (event: FormEvent) => {
        event.preventDefault();

        Api.post('/propriedades', {
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
                response.status === 201
                    ? history.push('/propriedade')
                    : alert("Não foi possivel adicionar a Propriedade");
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside UserImg={UserImg} />
            <Main>

                <PainelNav to="/propriedade" titulo="Adicionar Propriedade" />

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
                            fullWidth
                            required
                            margin="normal"
                            value={Nome}
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
                            value={InscEstadual}
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
                            value={Endereco}
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
                            value={Municipio}
                            onChange={event => setMunicipio(event.target.value)}
                        />

                        <TextField
                            name="Estado"
                            id="Estado"
                            label="Estado"
                            variant="outlined"
                            select
                            fullWidth
                            required
                            margin="normal"
                            value={Estado}
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
                                            {`${produtor.ProdutorId} - ${produtor.Nome}`}
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

export default CreatePropriedade;