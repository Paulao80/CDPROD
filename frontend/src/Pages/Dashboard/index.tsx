import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import { Props } from '../../Types';
import Main from '../../Components/Main';
import Container2 from '../../Components/Container2';
import { ChartMedia, ChartPropByMunicipio, ChartTipoTanque } from '../../Components/Charts';
import Static from '../../Components/Static';
import { useDispatch } from 'react-redux';
import { DashboardActive } from '../../Actions/PageActiveActions';

const Dashboard = ({ Logo, UserImg }: Props) => {

    const dispatch = useDispatch();

    dispatch(DashboardActive());

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside UserImg={UserImg} />
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