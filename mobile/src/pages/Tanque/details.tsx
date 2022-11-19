import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import Container from "../../components/container";
import DataView from "../../components/dataView";
import Header from "../../components/header";
import Panel from "../../components/panel";
import { Tanque } from "../../interfaces";
import { formatTipoTanque } from "../../utils/formatTipoTanque";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import mapMarker from "../../images/map-marker.png";

type TanqueDetailsProp = NativeStackScreenProps<
  RootStackParamList,
  "TanqueDetails"
>;

const TanqueDetails = (props: TanqueDetailsProp) => {
  const { route } = props;
  const tanque = route.params?.item as Tanque | undefined;
  console.log(
    "🚀 ~ file: details.tsx ~ line 21 ~ TanqueDetails ~ tanque",
    tanque
  );

  const styles = StyleSheet.create({
    map: {
      width: "100%",
      height: 300,
    },
    viewMap: {
      width: "100%",
      borderColor: "gray",
      borderWidth: 2,
      marginBottom: 12,
    },
    image: {
      width: "100%",
      height: 300,
      resizeMode: "cover",
    },
    br: {
      height: 60,
    },
  });

  return (
    <Container>
      <Header title="VISUALIZAR TANQUE" />
      <Panel background>
        {tanque?.FotoPath && (
          <View style={styles.viewMap}>
            <Image style={styles.image} source={{ uri: tanque.FotoPath }} />
          </View>
        )}
        <DataView name="Rota" value={tanque?.Rota} />
        <DataView name="Capacidade" value={tanque?.Capacidade} />
        <DataView name="Média Diária" value={tanque?.MediaDiaria} />
        <DataView
          name="Tipo de Tanque"
          value={formatTipoTanque(tanque?.TipoTanque)}
        />
        <DataView name="Nº de Série" value={tanque?.NumeroSerie} />
        <DataView name="Marca" value={tanque?.Marca} />
        <DataView name="Latitude" value={tanque?.Latitude} />
        <DataView name="Longitude" value={tanque?.Longitude} />
        <View style={styles.viewMap}>
          <MapView
            region={{
              latitude: tanque?.Latitude
                ? tanque?.Latitude
                : -10.881605848508551,
              longitude: tanque?.Longitude
                ? tanque?.Longitude
                : -61.94100229171383,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            style={styles.map}
          >
            {tanque?.Latitude && tanque?.Longitude && (
              <Marker
                icon={mapMarker}
                coordinate={{
                  latitude: tanque?.Latitude,
                  longitude: tanque?.Longitude,
                }}
              />
            )}
          </MapView>
        </View>
        <View style={styles.br}></View>
      </Panel>
    </Container>
  );
};

export default TanqueDetails;
