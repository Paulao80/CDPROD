import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import { Props } from '../../Types';
import Main from '../../Components/Main';
import Container2 from '../../Components/Container2';
import { ChartMedia, ChartPropByMunicipio } from '../../Components/Charts'

const Dashboard = ({ Logo, UserImg, Responsive, BtnState, HambClick }: Props) => {

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="dashboard" responsive={Responsive} />
            <Main>
                <Container2>
                    <ChartMedia />
                    <ChartPropByMunicipio />
                </Container2>
            </Main>
            <Footer />
        </>
    );
}

export default Dashboard;