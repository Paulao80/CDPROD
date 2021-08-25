import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';


type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

const Relatorios = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="relatorios" responsive={Responsive} />
            <Footer />
        </>
    )
}

export default Relatorios;