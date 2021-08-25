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

const Tanque = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="tanque" responsive={Responsive} />
            <Footer />
        </>
    )
}

export default Tanque;