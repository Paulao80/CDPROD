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
import { Produtor, Propriedade, Uf } from '../../Interfaces';
import Api from '../../Services/Api';
import Logo from '../../Assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { PropriedadesActive } from '../../Actions/PageActiveActions';

interface Param {
    id: string;
}

interface Error {
    message: string;
    errors: {
        PropriedadeId: string[];
        Endereco: string[];
        Estado: string[];
        InscEstadual: string[];
        Municipio: string[];
        Nirf: string[];
        Nome: string[];
        "Produtor.ProdutorId": string[];
    };
}

const EditPropriedade = () => {
    const dispatch = useDispatch();

    dispatch(PropriedadesActive());

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

        Api.get('/produtores').then(response => {
            setProdutores(response.data);
        }).catch(error => {
            if (error.response.status === 500) {
                history.push('/propriedade');
            }
        });

        Api.get(`/propriedades/${id}`).then(response => {
            setPropriedade(response.data);
        }).catch(error => {
            if (error.response.status === 500) {
                history.push('/propriedade');
            }
        });
    }, [id, history]);

    const [Nirf, setNirf] = useState<string>();
    const [Nome, setNome] = useState<string>();
    const [InscEstadual, setInscEstadual] = useState<string>();
    const [Endereco, setEndereco] = useState<string>();
    const [Municipio, setMunicipio] = useState<string>();
    const [Estado, setEstado] = useState<string>();
    const [ProdutorId, setProdutorId] = useState<number>();
    const [ErrorForm, SetErrorForm] = useState<Error>();

    useEffect(() => {
        setNirf(propriedade.Nirf);
        setNome(propriedade.Nome);
        setInscEstadual(propriedade.InscEstadual);
        setEndereco(propriedade.Endereco);
        setMunicipio(propriedade.Municipio);
        setEstado(propriedade.Estado);
        setProdutorId(propriedade?.Produtor?.ProdutorId)
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
                SetErrorForm(error.response.data);
            });
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <PainelNav to={`/propriedade`} titulo="Editar Propriedade" />
                <Container>

                    <form onSubmit={OnSubmit}>

                        {
                            ErrorForm?.message !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.message}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Nirf"
                            id="Nirf"
                            label="NIRF"
                            variant="outlined"
                            InputProps={{
                                inputComponent: NirfMaskCustom as any,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                            value={Nirf}
                            onChange={event => setNirf(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Nirf !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Nirf}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Nome"
                            id="Nome"
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={Nome}
                            onChange={event => setNome(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Nome !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Nome}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="InscEstadual"
                            id="InscEstadual"
                            label="Inscrição Estadual"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={InscEstadual}
                            onChange={event => setInscEstadual(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.InscEstadual !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.InscEstadual}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Endereco"
                            id="Endereco"
                            label="Endereço"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={Endereco}
                            onChange={event => setEndereco(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Endereco !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Endereco}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Municipio"
                            id="Municipio"
                            label="Municipio"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={Municipio}
                            onChange={event => setMunicipio(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Municipio !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Municipio}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Estado"
                            id="Estado"
                            label="Estado"
                            variant="outlined"
                            select
                            fullWidth
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

                        {
                            ErrorForm?.errors.Estado !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Estado}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="ProdutorId"
                            id="ProdutorId"
                            label="Produtor"
                            variant="outlined"
                            select
                            fullWidth
                            margin="normal"
                            value={ProdutorId}
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

                        {
                            ErrorForm?.errors['Produtor.ProdutorId'] !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors['Produtor.ProdutorId'][0]}</p>
                                    </div>
                                )
                                : ""
                        }

                        <BtnSave />
                    </form>

                </Container>
            </Main>
            <Footer />
        </>
    );
}

export default EditPropriedade;