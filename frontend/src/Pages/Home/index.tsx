import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';

type props = {
    Logo: string;
    UserImg: string;
}


const Home = ({ Logo, UserImg }: props) => {
    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside UserImg={UserImg} Active="dashboard" />
        </>
    );
}

export default Home;