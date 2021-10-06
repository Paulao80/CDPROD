import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container2 from '../../Components/Container2';
import { ChartMedia, ChartPropByMunicipio, ChartTipoTanque } from '../../Components/Charts';
import Static from '../../Components/Static';
import { useDispatch } from 'react-redux';
import { DashboardActive } from '../../Actions/PageActiveActions';
import Logo from '../../Assets/images/logo.png';

const Dashboard = () => {

    const dispatch = useDispatch();

    dispatch(DashboardActive());

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <Container2>
                    <Static />
                    <div className="charts">
                        <div className="chart ch1">
                            <h3>Quantidade de propriedade por Cidade</h3>
                            <ChartPropByMunicipio />
                        </div>
                        <div className="chart ch2">
                            <h3>Quantidade por Tipo de Tanque</h3>
                            <ChartTipoTanque />
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: '#eaeaea',
                        paddingTop: '10px',
                    }}>
                        <h3 style={{
                            textAlign: 'center',
                            marginBottom: '10px',
                        }}>Média Diária dos Tanques</h3>
                        <ChartMedia />
                    </div>
                </Container2>
            </Main>
            <Footer />
        </>
    );
}

export default Dashboard;