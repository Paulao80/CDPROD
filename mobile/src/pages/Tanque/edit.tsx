import React, { useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import Container from "../../components/container";
import Header from "../../components/header";
import Panel from "../../components/panel";
import RNPickerSelect from "react-native-picker-select";
import MapView, { Marker, MapEvent, Region } from "react-native-maps";
import mapMarker from "../../images/map-marker.png";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { FormTanqueType } from "../../hooks";
import ButtonSave from "../../components/buttonSave";
import { Tanque } from "../../interfaces";

type TanqueEditProp = NativeStackScreenProps<
  RootStackParamList,
  "TanqueEdit"
> & {
  form: FormTanqueType;
  onEdit: () => Promise<boolean>;
  pickFile: () => Promise<void>;
  imageShow: string | undefined;
  region: Region | undefined;
  selectMapPosition: (event: MapEvent<{}>) => void;
  getGeoLocation: () => Promise<void>;
  setImageShowPath: (path?: string | undefined) => void;
  setRegionLocation: (
    latitude?: number | undefined,
    longitude?: number | undefined
  ) => void;
};

const TanqueEdit = (props: TanqueEditProp) => {
  const {
    navigation,
    route,
    form,
    onEdit,
    pickFile,
    imageShow,
    region,
    selectMapPosition,
    getGeoLocation,
    setImageShowPath,
    setRegionLocation,
  } = props;

  const tanque = route.params?.item as Tanque | undefined;

  useEffect(() => {
    if (tanque) {
      form.setForm(tanque);
      setImageShowPath(tanque.FotoPath);
      setRegionLocation(tanque.Latitude, tanque.Longitude);
    }
  }, [tanque]);

  const OnNavigateToList = () => navigation.navigate("TanqueList");

  return (
    <Container>
      <Header title="EDITAR TANQUE" />
      <Panel background>
        <View style={styles.viewMap}>
          <MapView
            initialRegion={{
              latitude: -10.881605848508551,
              longitude: -61.94100229171383,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            region={region}
            style={styles.map}
            onPress={selectMapPosition}
          >
            {form.formValues.Latitude !== undefined &&
              form.formValues.Longitude !== undefined && (
                <Marker
                  icon={mapMarker}
                  coordinate={{
                    latitude: form.formValues.Latitude,
                    longitude: form.formValues.Longitude,
                  }}
                />
              )}
          </MapView>
          <TouchableOpacity style={styles.btnLocation} onPress={getGeoLocation}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Pegar
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Rota"
            placeholderTextColor="black"
            onChangeText={(Rota) => form.setForm({ Rota })}
            value={form.formValues.Rota}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Capacidade"
            placeholderTextColor="black"
            onChangeText={(Capacidade) =>
              form.setForm({ Capacidade: Number(Capacidade) })
            }
            value={form.formValues.Capacidade?.toString()}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Média Diária"
            placeholderTextColor="black"
            onChangeText={(MediaDiaria) =>
              form.setForm({ MediaDiaria: Number(MediaDiaria) })
            }
            value={form.formValues.MediaDiaria?.toString()}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.control}>
          <RNPickerSelect
            onValueChange={(TipoTanque) => form.setForm({ TipoTanque })}
            value={form.formValues.TipoTanque}
            placeholder={{
              label: "Tipo de Tanque",
              value: undefined,
            }}
            items={[
              {
                label: "Individual",
                value: 1,
              },
              {
                label: "Comunitário",
                value: 2,
              },
            ]}
            style={customPickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Número de Série"
            placeholderTextColor="black"
            onChangeText={(NumeroSerie) => form.setForm({ NumeroSerie })}
            value={form.formValues.NumeroSerie}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Marca"
            placeholderTextColor="black"
            onChangeText={(Marca) => form.setForm({ Marca })}
            value={form.formValues.Marca}
          />
        </View>
        <View style={styles.viewMap}>
          <Image style={styles.map} source={{ uri: imageShow }} />
          <TouchableOpacity style={styles.btnLocation} onPress={pickFile}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Pegar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.br}></View>
      </Panel>
      <ButtonSave
        OnPress={() => {
          onEdit().then((resp) => {
            if (resp) OnNavigateToList();
          });
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  label: {
    textAlign: "left",
    width: "100%",
    marginBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  control: {
    width: "100%",
    marginBottom: 15,
  },
  br: {
    height: 60,
  },
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
  btnLocation: {
    width: "100%",
    height: 40,
    backgroundColor: "#3da5dc",
    alignItems: "center",
    justifyContent: "center",
  },
});

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    color: "black",
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  inputAndroid: {
    color: "black",
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  placeholder: {
    color: "black",
  },
});

export default TanqueEdit;
