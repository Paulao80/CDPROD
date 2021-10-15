import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import Painel from '../../Components/Painel';
import { People, House, LocalDrink } from '@material-ui/icons';
import Api from '../../Services/Api';
import { useDispatch } from 'react-redux';
import { RelatoriosActive } from '../../Actions/PageActiveActions';
import Logo from '../../Assets/images/logo.png';
import Loading from '../../Assets/images/loading.gif';
import { useState } from 'react';

const Relatorios = () => {
    const dispatch = useDispatch();

    const [prodLoading, setProdLoading] = useState(false);
    const [propLoading, setPropLoading] = useState(false);
    const [tanqLoading, settanqLoading] = useState(false);

    dispatch(RelatoriosActive());

    const BtnClick = async (tipo: string) => {

        switch (tipo) {
            case "produtor":
                setProdLoading(true);
                break;
            case "propriedade":
                setPropLoading(true);
                break;
            case "tanque":
                settanqLoading(true);
                break;
            default:
                break;
        }

        await Api.get('/relatorio', {
            responseType: 'blob',
            params: {
                tipo
            }
        })
            .then(response => {
                var blob = new Blob([response.data], { type: 'application/pdf' });
                var url = URL.createObjectURL(blob);

                window.open(url);

                switch (tipo) {
                    case "produtor":
                        setProdLoading(false);
                        break;
                    case "propriedade":
                        setPropLoading(false);
                        break;
                    case "tanque":
                        settanqLoading(false);
                        break;
                    default:
                        break;
                }
            });
    };

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <Painel titulo="Relatórios" />
                <Container>
                    <div className="btns-cards">
                        <div className="btn-card" onClick={() => BtnClick("produtor")}>
                            {
                                prodLoading
                                    ? (<img src={Loading} alt="Loading" width="100" height="100" />)
                                    : (
                                        <>
                                            <People className="btn-icon" />
                                            <span>Produtores</span>
                                        </>
                                    )
                            }
                        </div>
                        <div className="btn-card" onClick={() => BtnClick("propriedade")}>
                            {
                                propLoading
                                    ? (<img src={Loading} alt="Loading" width="100" height="100" />)
                                    : (
                                        <>
                                            <House className="btn-icon" />
                                            <span>Propriedades</span>
                                        </>
                                    )
                            }
                        </div>
                        <div className="btn-card" onClick={() => BtnClick("tanque")}>
                            {
                                tanqLoading
                                    ? (<img src={Loading} alt="Loading" width="100" height="100" />)
                                    : (
                                        <>
                                            <LocalDrink className="btn-icon" />
                                            <span>Tanques</span>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </Container>
            </Main>
            <Footer />
        </>
    )
}

export default Relatorios;