import Aside from '../../Components/Aside';
import Container from '../../Components/Container';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Main from '../../Components/Main';
import PainelNav from '../../Components/PainelNav';
import BtnSave from '../../Components/ButtonSave';
import './style.css';
import { TextField } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import Api from '../../Services/Api';
import { Produtor } from '../../Interfaces';
import Logo from '../../Assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { ProdutoresActive } from '../../Actions/PageActiveActions';

interface Param {
    id: string;
}

const AddContas = () => {
    const dispatch = useDispatch();

    dispatch(ProdutoresActive());

    const { id } = useParams<Param>();
    const history = useHistory();

    const [produtor, setProdutor] = useState<Produtor>({} as Produtor);

    const [NomePertence, setNomePertence] = useState("");
    const [Banco, setBanco] = useState("");
    const [Agencia, setAgencia] = useState("");
    const [Conta, setConta] = useState("");

    const [NomePertenceDisabled, setNomePertenceDisabled] = useState(false);

    useEffect(() => {
        Api.get(`/produtores/${id}`).then((response) => {
            setProdutor(response.data);
        })
    }, [id])

    const OnSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await Api.post('contas', {
            NomePertence,
            Banco,
            Agencia,
            Conta,
            Produtor: {
                ProdutorId: produtor.ProdutorId
            }
        }).then(response => {
            response.status === 201
                ? history.push(`/produtor/contas/${id}`)
                : alert("Não foi possivel adicionar a conta ao Produtor");
        });
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <PainelNav to={`/produtor/contas/${id}`} titulo="Adicionar Conta Bancária" />
                <Container>

                    <form onSubmit={OnSubmit}>
                        {`Pertence ao produtor ${produtor.Nome}? `}
                        <input
                            type="checkbox"
                            name="CkPertence"
                            id="CkPertence"
                            onChange={event => {
                                if (event.target.checked) {
                                    setNomePertence(produtor.Nome);
                                    setNomePertenceDisabled(true);
                                }
                                else {
                                    setNomePertence("");
                                    setNomePertenceDisabled(false);
                                }
                            }}
                        />

                        <TextField
                            name="NomePertence"
                            id="NomePertence"
                            label="Nome Pertence"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={NomePertence}
                            onChange={event => setNomePertence(event.target.value)}
                            disabled={NomePertenceDisabled}
                        />

                        <TextField
                            name="Banco"
                            id="Banco"
                            label="Banco"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Banco}
                            onChange={event => setBanco(event.target.value)}
                        />

                        <TextField
                            name="Agencia"
                            id="Agencia"
                            label="Agencia"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Agencia}
                            onChange={event => setAgencia(event.target.value)}
                        />

                        <TextField
                            name="Conta"
                            id="Conta"
                            label="Conta"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Conta}
                            onChange={event => setConta(event.target.value)}
                        />

                        <BtnSave />
                    </form>

                </Container>
            </Main>
            <Footer />
        </>
    );
}

export default AddContas;