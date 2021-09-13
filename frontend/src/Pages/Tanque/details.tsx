import './style.css';
import 'leaflet/dist/leaflet.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnEdt from '../../Components/ButtonEdt';
import PainelNav from '../../Components/PainelNav';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { iconLocation } from '../../Util/Icons';
import { useParams } from 'react-router-dom';
import { TanquesData } from '../../Util/Data';
import ShowData from '../../Components/ShowData';
import { GetTipoTanque } from '../../Util/Functions';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

interface Param {
    id: string;
}

const DetailsTanque = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const { id } = useParams<Param>();

    const tanque = TanquesData.filter(obj => obj.TanqueId === parseInt(id))[0];

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="tanque" responsive={Responsive} />
            <Main>
                <PainelNav to="/tanque" titulo="Detalhes do Tanque" />
                <Container>
                    <img className="img-details" src={tanque.FotoPath} alt="Tanque" />

                    <div className="ShowDatas">
                        <ShowData Label="Id" Data={tanque.TanqueId} />
                        <ShowData Label="Rota" Data={tanque.Rota} />
                        <ShowData Label="Capacidade" Data={tanque.Capacidade} />
                        <ShowData Label="Média Diária" Data={tanque.MediaDiaria} />
                        <ShowData Label="Rota" Data={tanque.TanqueId} />
                        <ShowData Label="Tipo de Tanque" Data={GetTipoTanque(tanque.TipoTanque)} />
                        <ShowData Label="Nº de Série" Data={tanque.NumeroSerie} />
                        <ShowData Label="Marca" Data={tanque.Marca} />
                        <ShowData Label="Latitude" Data={tanque.Latitude} />
                        <ShowData Label="Longitude" Data={tanque.Longitude} />
                    </div>

                    <MapContainer
                        center={[tanque.Latitude, tanque.Longitude]}
                        zoom={14}
                        style={{
                            width: '100%',
                            height: '325px'
                        }}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                        />

                        <Marker
                            position={[tanque.Latitude, tanque.Longitude]}
                            interactive={false}
                            icon={iconLocation}
                        />
                    </MapContainer>
                </Container>
            </Main>
            <BtnEdt to={`/tanque/edit/${tanque.TanqueId}`} />
            <Footer />
        </>
    );
}

export default DetailsTanque;