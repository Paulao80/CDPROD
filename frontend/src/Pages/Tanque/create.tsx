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
import { FormEvent, ChangeEvent, useState } from 'react';
import { iconLocation } from '../../Util/Icons';
import Api from '../../Services/Api';
import { useHistory } from 'react-router-dom';
import { Props } from '../../Types';

const CreateTanque = ({ Logo, UserImg }: Props) => {
    const history = useHistory();

    const [position, setPosition] = useState({ Latitude: 0, Longitude: 0 })

    const LocationMarker = () => {

        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition({
                    Latitude: lat,
                    Longitude: lng,
                })
                map.flyTo(e.latlng, map.getZoom())
            }
        })

        return (
            position.Latitude !== 0 ?
                <Marker
                    position={[position.Latitude, position.Longitude]}
                    interactive={false}
                    icon={iconLocation}
                />

                : null
        )

    }

    const [Rota, setRota] = useState("");
    const [Capacidade, setCapacidade] = useState(0);
    const [MediaDiaria, setMediaDiaria] = useState(0);
    const [TipoTanque, setTipoTanque] = useState(1);
    const [NumeroSerie, setNumeroSerie] = useState("");
    const [Marca, setMarca] = useState("");
    const [image, setImage] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);

    const OnSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const { Latitude, Longitude } = position;

        const data = new FormData();

        data.append('Rota', Rota);
        data.append('Capacidade', String(Capacidade));
        data.append('MediaDiaria', String(MediaDiaria));
        data.append('TipoTanque', String(TipoTanque));
        data.append('NumeroSerie', NumeroSerie);
        data.append('Marca', Marca);
        data.append('Latitude', String(Latitude));
        data.append('Longitude', String(Longitude));
        image.forEach(image => {
            data.append('image', image);
        })

        await Api.post('/tanques', data);

        history.push('/tanque');
    }

    const SelectedImages = (event: ChangeEvent<HTMLInputElement>) => {

        if (!event.target.files) {
            return;
        }

        const imagens = Array.from(event.target.files);

        setImage(imagens);

        const imagensPreview = imagens.map(image => {
            return URL.createObjectURL(image);
        });

        setPreview(imagensPreview);
    }

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside UserImg={UserImg} />
            <Main>
                <PainelNav to="/tanque" titulo="Adicionar Tanque" />
                <Container>

                    <form onSubmit={OnSubmit}>
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

                        <TextField
                            name="Rota"
                            id="Rota"
                            label="Rota"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Rota}
                            onChange={event => setRota(event.target.value)}
                        />

                        <TextField
                            name="Capacidade"
                            id="Capacidade"
                            label="Capacidade"
                            variant="outlined"
                            type="number"
                            fullWidth
                            required
                            margin="normal"
                            value={Capacidade}
                            onChange={event => setCapacidade(Number(event.target.value))}
                        />

                        <TextField
                            name="MediaDiaria"
                            id="MediaDiaria"
                            label="Média Diária"
                            variant="outlined"
                            type="number"
                            fullWidth
                            required
                            margin="normal"
                            value={MediaDiaria}
                            onChange={event => setMediaDiaria(Number(event.target.value))}
                        />

                        <TextField
                            name="TipoTanque"
                            id="TipoTanque"
                            label="Tipo de Tanque"
                            variant="outlined"
                            select
                            fullWidth
                            required
                            margin="normal"
                            value={TipoTanque ? TipoTanque : 1}
                            onChange={event => setTipoTanque(Number(event.target.value))}
                        >

                            <MenuItem key={1} value={1}>
                                Individual
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                                Comunitário
                            </MenuItem>

                        </TextField>

                        <TextField
                            name="Foto"
                            id="Foto"
                            label="Foto do Tanque"
                            variant="outlined"
                            type="file"
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={SelectedImages}
                        />

                        {preview.map(image => {
                            return (
                                <img className="img-details" key={image} src={image} alt="imagem" />
                            );
                        })}

                        <TextField
                            name="NumeroSerie"
                            id="NumeroSerie"
                            label="Nº de Série do Tanque"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={NumeroSerie}
                            onChange={event => setNumeroSerie(event.target.value)}
                        />

                        <TextField
                            name="Marca"
                            id="Marca"
                            label="Marca do Tanque"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={Marca}
                            onChange={event => setMarca(event.target.value)}
                        />

                        <BtnSave />
                    </form>

                </Container>
            </Main>

            <Footer />
        </>
    );
}

export default CreateTanque;