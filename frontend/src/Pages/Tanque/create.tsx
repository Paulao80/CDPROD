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
import Logo from '../../Assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { TanquesActive } from '../../Actions/PageActiveActions';

interface Position {
    Latitude: number;
    Longitude: number;
}

interface Error {
    message: string;
    errors: {
        Capacidade: string[];
        Latitude: string[];
        Longitude: string[];
        Marca: string[];
        MediaDiaria: string[];
        NumeroSerie: string[];
        TipoTanque: string[];
        Rota: string[];
    };
}

const CreateTanque = () => {
    const dispatch = useDispatch();

    dispatch(TanquesActive());

    const history = useHistory();

    const [position, setPosition] = useState<Position>()

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
            position !== undefined ?
                <Marker
                    position={[position.Latitude, position.Longitude]}
                    interactive={false}
                    icon={iconLocation}
                />

                : null
        )

    }

    const [Rota, setRota] = useState<string>();
    const [Capacidade, setCapacidade] = useState<number>();
    const [MediaDiaria, setMediaDiaria] = useState<number>();
    const [TipoTanque, setTipoTanque] = useState<number>();
    const [NumeroSerie, setNumeroSerie] = useState<string>();
    const [Marca, setMarca] = useState<string>();
    const [image, setImage] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [ErrorForm, setErrorForm] = useState<Error>();

    const OnSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const data = new FormData();

        if (Rota) data.append('Rota', Rota);
        if (Capacidade) data.append('Capacidade', String(Capacidade));
        if (MediaDiaria) data.append('MediaDiaria', String(MediaDiaria));
        if (TipoTanque) data.append('TipoTanque', String(TipoTanque));
        if (NumeroSerie) data.append('NumeroSerie', NumeroSerie);
        if (Marca) data.append('Marca', Marca);
        if (position) {
            data.append('Latitude', String(position.Latitude));
            data.append('Longitude', String(position.Longitude));
        }
        image.forEach(image => {
            data.append('image', image);
        })

        await Api.post('/tanques', data).then(response => {
            response.status === 201
                ? history.push('/tanque')
                : alert("Não foi possivel adicionar o Tanque");
        }).catch(error => {
            setErrorForm(error.response.data);
        });
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
            <Aside />
            <Main>
                <PainelNav to="/tanque" titulo="Adicionar Tanque" />
                <Container>

                    <form onSubmit={OnSubmit}>

                        {
                            ErrorForm?.message !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.message}</p>
                                    </div>
                                )
                                : ""
                        }

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

                        {
                            ErrorForm?.errors.Latitude !== undefined && ErrorForm?.errors.Longitude !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Latitude}</p>
                                        <p>{ErrorForm.errors.Longitude}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Rota"
                            id="Rota"
                            label="Rota"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={Rota}
                            onChange={event => setRota(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Rota !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Rota}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Capacidade"
                            id="Capacidade"
                            label="Capacidade"
                            variant="outlined"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={Capacidade}
                            onChange={event => setCapacidade(Number(event.target.value))}
                        />

                        {
                            ErrorForm?.errors.Capacidade !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Capacidade}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="MediaDiaria"
                            id="MediaDiaria"
                            label="Média Diária"
                            variant="outlined"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={MediaDiaria}
                            onChange={event => setMediaDiaria(Number(event.target.value))}
                        />

                        {
                            ErrorForm?.errors.MediaDiaria !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.MediaDiaria}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="TipoTanque"
                            id="TipoTanque"
                            label="Tipo de Tanque"
                            variant="outlined"
                            select
                            fullWidth
                            margin="normal"
                            value={TipoTanque}
                            onChange={event => setTipoTanque(Number(event.target.value))}
                        >

                            <MenuItem key={1} value={1}>
                                Individual
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                                Comunitário
                            </MenuItem>

                        </TextField>

                        {
                            ErrorForm?.errors.TipoTanque !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.TipoTanque}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Foto"
                            id="Foto"
                            label="Foto do Tanque"
                            variant="outlined"
                            type="file"
                            fullWidth
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
                            margin="normal"
                            value={NumeroSerie}
                            onChange={event => setNumeroSerie(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.NumeroSerie !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.NumeroSerie}</p>
                                    </div>
                                )
                                : ""
                        }

                        <TextField
                            name="Marca"
                            id="Marca"
                            label="Marca do Tanque"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={Marca}
                            onChange={event => setMarca(event.target.value)}
                        />

                        {
                            ErrorForm?.errors.Marca !== undefined
                                ? (
                                    <div className="Message-error">
                                        <p>{ErrorForm.errors.Marca}</p>
                                    </div>
                                )
                                : ""
                        }

                        <BtnSave />
                    </form>

                </Container>
            </Main>

            <Footer />
        </>
    );
}

export default CreateTanque;