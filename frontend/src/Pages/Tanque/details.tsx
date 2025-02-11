import "./style.css";
import "leaflet/dist/leaflet.css";
import Header from "../../Components/Header";
import Aside from "../../Components/Aside";
import Footer from "../../Components/Footer";
import Main from "../../Components/Main";
import Container from "../../Components/Container";
import BtnEdt from "../../Components/ButtonEdt";
import PainelNav from "../../Components/PainelNav";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { iconLocation } from "../../Util/Icons";
import { useParams } from "react-router-dom";
import ShowData from "../../Components/ShowData";
import { GetTipoTanque } from "../../Util/Functions";
import { Tanque } from "../../Interfaces";
import { useState, useEffect } from "react";
import Logo from "../../Assets/images/logo.png";
import { useDispatch } from "react-redux";
import { TanquesActive } from "../../Actions/PageActiveActions";
import useTanque from "../../Hooks/useTanque";

const DetailsTanque = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getById } = useTanque();
  const [tanque, setTanque] = useState<Tanque>();

  useEffect(() => {
    if (id)
      getById(Number(id)).then((res) => {
        if (res) setTanque(res);
      });
  }, [id, getById]);

  dispatch(TanquesActive());

  if (tanque === undefined) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <PainelNav to="/tanque" titulo="Detalhes do Tanque" />
        <Container>
          <img className="img-details" src={tanque.FotoPath} alt="Tanque" />

          <div className="ShowDatas">
            <ShowData Label="Id" Data={tanque.TanqueId} />
            <ShowData Label="Rota" Data={tanque.Rota} />
            <ShowData Label="Capacidade" Data={tanque.Capacidade} />
            <ShowData Label="Média Diária" Data={tanque.MediaDiaria} />
            <ShowData
              Label="Tipo de Tanque"
              Data={GetTipoTanque(tanque.TipoTanque)}
            />
            <ShowData Label="Nº de Série" Data={tanque.NumeroSerie} />
            <ShowData Label="Marca" Data={tanque.Marca} />
            <ShowData Label="Latitude" Data={tanque.Latitude} />
            <ShowData Label="Longitude" Data={tanque.Longitude} />
          </div>

          <MapContainer
            center={[
              tanque.Latitude ? tanque.Latitude : 0,
              tanque.Longitude ? tanque.Longitude : 0,
            ]}
            zoom={14}
            style={{
              width: "100%",
              height: "325px",
            }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />

            <Marker
              position={[
                tanque.Latitude ? tanque.Latitude : 0,
                tanque.Longitude ? tanque.Longitude : 0,
              ]}
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
};

export default DetailsTanque;
