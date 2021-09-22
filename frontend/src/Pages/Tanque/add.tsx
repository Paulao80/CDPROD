import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnSave from '../../Components/ButtonSave';
import { TextField, MenuItem } from '@material-ui/core';
import PainelNav from '../../Components/PainelNav';
import { useHistory, useParams } from 'react-router-dom';
import { FormEvent, useState, useEffect } from 'react';
import Api from '../../Services/Api';
import { Props } from '../../Types';
import { Produtor } from '../../Interfaces';

interface Param {
    id: string;
}

const AddProdutorTanque = ({ Logo, UserImg, Responsive, BtnState, HambClick }: Props) => {
    const { id } = useParams<Param>();
    const history = useHistory();

    const [ProdutorId, setProdutorId] = useState<number>();
    const [Responsavel, setResponsavel] = useState<number>();
    const [Produtores, setProdutores] = useState<Produtor[]>([]);

    useEffect(() => {
        Api.get('/produtores').then(response => {
            setProdutores(response.data);
        });
    }, []);

    const OnSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (ProdutorId !== undefined && Responsavel !== undefined) {
            await Api.post('prodtanques', {
                Responsavel: Responsavel === 1 ? true : false,
                Produtor: {
                    ProdutorId
                },
                Tanque: {
                    TanqueId: Number(id)
                }
            }).then(response => {
                response.status === 201
                    ? history.push(`/tanque/produtores/${id}`)
                    : alert("Não foi possivel adicionar o Produtor ao Tanque");
            });
        }
    }


    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="tanque" responsive={Responsive} />
            <Main>
                <PainelNav to={`/tanque/produtores/${id}`} titulo="Adicionar Propriedade" />
                <Container>

                    <form onSubmit={OnSubmit}>
                        <TextField
                            name="ProdutorId"
                            id="ProdutorId"
                            label="Produtor"
                            variant="outlined"
                            select
                            fullWidth
                            required
                            margin="normal"
                            onChange={event => setProdutorId(Number(event.target.value))}
                        >

                            {
                                Produtores.map(produtor => {
                                    return (
                                        <MenuItem key={produtor.ProdutorId} value={produtor.ProdutorId}>
                                            {produtor.Nome}
                                        </MenuItem>
                                    );
                                })
                            }

                        </TextField>

                        <TextField
                            name="Responsavel"
                            id="Responsavel"
                            label="Responsavel"
                            variant="outlined"
                            select
                            fullWidth
                            required
                            margin="normal"
                            onChange={event => setResponsavel(Number(event.target.value))}
                        >

                            <MenuItem key={1} value={1}>
                                Sim
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                                Não
                            </MenuItem>

                        </TextField>

                        <BtnSave />
                    </form>

                </Container>
            </Main>
            <Footer />
        </>
    );
}

export default AddProdutorTanque;