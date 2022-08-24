import "leaflet/dist/leaflet.css";
import Header from "../Components/Header";
import Aside from "../Components/Aside";
import Footer from "../Components/Footer";
import Main from "../Components/Main";
import Container from "../Components/Container";
import BtnSave from "../Components/ButtonSave";
import { TextField, MenuItem } from "@mui/material";
import PainelNav from "../Components/PainelNav";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { FormEvent } from "react";
import { iconLocation } from "../Util/Icons";
import Logo from "../Assets/images/logo.png";
import { useDispatch } from "react-redux";
import { TanquesActive } from "../Actions/PageActiveActions";
import useTanque from "../Hooks/useTanque";
import { SetFormData } from "../Util/Functions";

const TanqueContent = (id?: number) => {
  const dispatch = useDispatch();
  const {
    errorForm,
    form,
    setForm,
    onFinish,
    onEdit,
    preview,
    SelectedImages,
  } = useTanque(id);

  dispatch(TanquesActive());

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setForm((prev) => {
          return { ...prev, Latitude: lat, Longitude: lng };
        });
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return form?.Latitude !== undefined && form?.Longitude !== undefined ? (
      <Marker
        position={[form?.Latitude, form?.Longitude]}
        interactive={false}
        icon={iconLocation}
      />
    ) : null;
  };

  const OnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (id) {
      onEdit();
    } else {
      onFinish();
    }
  };

  if (form?.Latitude === undefined || form?.Longitude === undefined) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header logo={Logo} titulo="CDTR" />
      <Aside />
      <Main>
        <PainelNav
          to="/tanque"
          titulo={`${id ? "Editar" : "Adicionar"} Tanque`}
        />
        <Container>
          <form onSubmit={OnSubmit}>
            {errorForm?.message !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.message}</p>
              </div>
            ) : (
              ""
            )}

            <MapContainer
              center={[-10.930750223902585, -61.927419334264975]}
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

              <LocationMarker />
            </MapContainer>

            {errorForm?.errors?.Latitude !== undefined &&
            errorForm?.errors?.Longitude !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Latitude}</p>
                <p>{errorForm.errors.Longitude}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Rota"
              id="Rota"
              label="Rota"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.Rota}
              onChange={(event) => SetFormData(event, setForm)}
            />

            {errorForm?.errors?.Rota !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Rota}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Capacidade"
              id="Capacidade"
              label="Capacidade"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              value={form?.Capacidade}
              onChange={(event) => SetFormData(event, setForm, Number)}
            />

            {errorForm?.errors?.Capacidade !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Capacidade}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="MediaDiaria"
              id="MediaDiaria"
              label="Média Diária"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              value={form?.MediaDiaria}
              onChange={(event) => SetFormData(event, setForm, Number)}
            />

            {errorForm?.errors?.MediaDiaria !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.MediaDiaria}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="TipoTanque"
              id="TipoTanque"
              label="Tipo de Tanque"
              variant="outlined"
              select
              fullWidth
              margin="normal"
              value={form?.TipoTanque !== 0 ? form?.TipoTanque : ""}
              onChange={(event) => SetFormData(event, setForm, Number)}
            >
              <MenuItem key={1} value={1}>
                Individual
              </MenuItem>
              <MenuItem key={2} value={2}>
                Comunitário
              </MenuItem>
            </TextField>

            {errorForm?.errors?.TipoTanque !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.TipoTanque}</p>
              </div>
            ) : (
              ""
            )}

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

            {preview.map((image) => {
              return (
                <img
                  className="img-details"
                  key={image}
                  src={image}
                  alt="imagem"
                />
              );
            })}

            <TextField
              name="NumeroSerie"
              id="NumeroSerie"
              label="Nº de Série do Tanque"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.NumeroSerie}
              onChange={(event) => SetFormData(event, setForm)}
            />

            {errorForm?.errors?.NumeroSerie !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.NumeroSerie}</p>
              </div>
            ) : (
              ""
            )}

            <TextField
              name="Marca"
              id="Marca"
              label="Marca do Tanque"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form?.Marca}
              onChange={(event) => SetFormData(event, setForm)}
            />

            {errorForm?.errors?.Marca !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.errors.Marca}</p>
              </div>
            ) : (
              ""
            )}

            <BtnSave />
          </form>
        </Container>
      </Main>

      <Footer />
    </>
  );
};

export default TanqueContent;
