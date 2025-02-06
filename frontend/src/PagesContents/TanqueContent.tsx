import "leaflet/dist/leaflet.css";
import Header from "../Components/Header";
import Aside from "../Components/Aside";
import Footer from "../Components/Footer";
import Main from "../Components/Main";
import Container from "../Components/Container";
import BtnSave from "../Components/ButtonSave";
import { MenuItem } from "@mui/material";
import PainelNav from "../Components/PainelNav";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { iconLocation } from "../Util/Icons";
import Logo from "../Assets/images/logo.png";
import { useDispatch } from "react-redux";
import { TanquesActive } from "../Actions/PageActiveActions";
import useTanque from "../Hooks/useTanque";
import { HiddenX, TextFieldX } from "../Components/Fields";
import Form, { Field } from "rc-field-form";
import { ChangeEvent } from "react";

const TanqueContent = (id?: number) => {
  const dispatch = useDispatch();
  const {
    errorForm,
    form,
    onFinish,
    onEdit,
    preview,
    SelectedImages,
    Latitude,
    Longitude,
    setPosition,
  } = useTanque(id);

  dispatch(TanquesActive());

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(lat, lng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return Latitude !== undefined && Longitude !== undefined ? (
      <Marker
        position={[Latitude, Longitude]}
        interactive={false}
        icon={iconLocation}
      />
    ) : null;
  };

  const OnSubmit = async () => {
    if (id) {
      onEdit();
    } else {
      onFinish();
    }
  };

  if (Latitude === undefined || Longitude === undefined) {
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
          <Form form={form} onFinish={OnSubmit}>
            {errorForm?.message !== undefined ? (
              <div className="Message-error">
                <p>{errorForm.message}</p>
              </div>
            ) : (
              ""
            )}

            <Field name="TanqueId">
              {(input, meta) => (
                <HiddenX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  type="number"
                  hidden
                />
              )}
            </Field>

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

            <Field name="Latitude">
              {(input, meta) => (
                <HiddenX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  type="number"
                  hidden
                />
              )}
            </Field>

            <Field name="Longitude">
              {(input, meta) => (
                <HiddenX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  type="number"
                  hidden
                />
              )}
            </Field>

            <Field name="Rota">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Rota"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="Capacidade">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Capacidade"
                  variant="outlined"
                  type="number"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="MediaDiaria">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Média Diária"
                  variant="outlined"
                  type="number"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="TipoTanque">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Tipo de Tanque"
                  variant="outlined"
                  select
                  fullWidth
                  margin="normal"
                >
                  <MenuItem key={1} value={1}>
                    Individual
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Comunitário
                  </MenuItem>
                </TextFieldX>
              )}
            </Field>

            <Field name="Foto">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  label="Foto do Tanque"
                  variant="outlined"
                  type="file"
                  fullWidth
                  margin="normal"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (input?.onChange) input.onChange(event);
                    SelectedImages(event);
                  }}
                />
              )}
            </Field>

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

            <Field name="image">
              {(input, meta) => (
                <HiddenX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  type="number"
                  hidden
                />
              )}
            </Field>

            <Field name="NumeroSerie">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Nº de Série do Tanque"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <Field name="Marca">
              {(input, meta) => (
                <TextFieldX
                  {...input}
                  meta={meta}
                  errorForm={errorForm}
                  label="Marca do Tanque"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>

            <BtnSave onClick={OnSubmit} form={form} />
          </Form>
        </Container>
      </Main>

      <Footer />
    </>
  );
};

export default TanqueContent;
