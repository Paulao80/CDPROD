import './style.css';
import 'leaflet/dist/leaflet.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnSave from '../../Components/ButtonSave';
import { TextField, MenuItem } from '@material-ui/core';
import PainelNav from '../../Components/PainelNav';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { iconLocation } from '../../Util/Icons';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

const CreateTanque = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {

    const LocationMarker = () => {
        const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition({
                    latitude: lat,
                    longitude: lng,
                })
                map.flyTo(e.latlng, map.getZoom())
            }
        })

        return (
            position.latitude !== 0 ?
                <Marker
                    position={[position.latitude, position.longitude]}
                    interactive={false}
                    icon={iconLocation}
                />

                : null
        )

    }

    const OnBtnSave = () => {

    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="tanque" responsive={Responsive} />
            <Main>
                <PainelNav to="/tanque" titulo="Adicionar Tanque" />
                <Container>
                    <MapContainer
                        center={[-10.930750223902585, -61.927419334264975]}
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

                        <LocationMarker />
                    </MapContainer>
                    <TextField name="Rota" id="Rota" label="Rota" variant="outlined" fullWidth required margin="normal" />
                    <TextField name="Capacidade" id="Capacidade" label="Capacidade" variant="outlined" type="number" fullWidth required margin="normal" />
                    <TextField name="MediaDiaria" id="MediaDiaria" label="Média Diária" variant="outlined" type="number" fullWidth required margin="normal" />
                    <TextField name="TipoTanque" id="TipoTanque" label="Tipo de Tanque" variant="outlined" select fullWidth required margin="normal">
                        <MenuItem key={1} value={1}>
                            Individual
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                            Comunitário
                        </MenuItem>
                    </TextField>
                    <TextField name="Foto" id="Foto" label="Foto do Tanque" variant="outlined" type="file" fullWidth required margin="normal" InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField name="NumeroSerie" id="NumeroSerie" label="Nº de Série do Tanque" variant="outlined" fullWidth required margin="normal" />
                    <TextField name="Marca" id="Marca" label="Marca do Tanque" variant="outlined" fullWidth required margin="normal" />
                </Container>
            </Main>
            <BtnSave />
            <Footer />
        </>
    );
}

export default CreateTanque;