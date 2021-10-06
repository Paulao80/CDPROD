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

const Relatorios = () => {
    const dispatch = useDispatch();

    dispatch(RelatoriosActive());

    const BtnClick = (tipo: string) => {

        Api.get('/relatorio', {
            responseType: 'blob',
            params: {
                tipo
            }
        })
            .then(response => {
                var blob = new Blob([response.data], { type: 'application/pdf' });
                var url = URL.createObjectURL(blob);

                window.open(url);
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
                            <People className="btn-icon" />
                            <span>Produtores</span>
                        </div>
                        <div className="btn-card" onClick={() => BtnClick("propriedade")}>
                            <House className="btn-icon" />
                            <span>Propriedades</span>
                        </div>
                        <div className="btn-card" onClick={() => BtnClick("tanque")}>
                            <LocalDrink className="btn-icon" />
                            <span>Tanques</span>
                        </div>
                    </div>
                </Container>
            </Main>
            <Footer />
        </>
    )
}

export default Relatorios;