import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import Container from "../../components/container";
import Header from "../../components/header";
import Panel from "../../components/panel";
import RNPickerSelect from "react-native-picker-select";
import MapView, { Marker, MapEvent } from 'react-native-maps';
import mapMarker from '../../images/map-marker.png';
import * as Location from 'expo-location';

const TanqueAdd = () => {

    const [location, setLocation] = useState<Location.LocationObject>();

    const [Rota, setRota] = useState<string>();
    const [Capacidade, setCapacidade] = useState<number>();
    const [MediaDiaria, setMediaDiaria] = useState<number>();
    const [TipoTanque, setTipoTanque] = useState<number>();
    const [NumeroSerie, setNumeroSerie] = useState<string>();
    const [Marca, setMarca] = useState<string>();
    const [Latitude, setLatitude] = useState<number>();
    const [Longitude, setLongitude] = useState<number>();


    const SelectMapPosition = (event: MapEvent) => {
        setLatitude(event.nativeEvent.coordinate.latitude);
        setLongitude(event.nativeEvent.coordinate.longitude);
    }

    const GetGeoLocation = (event: GestureResponderEvent) => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            setLocation(await Location.getCurrentPositionAsync({}));
        })();
    }

    useEffect(() => {
        setLatitude(location?.coords.latitude);
        setLongitude(location?.coords.longitude);
    }, [location])

    return (
        <Container>
            <Header title="ADICIONAR PROPRIEDADE" />
            <Panel background>
                <View style={styles.viewMap}>
                    <MapView
                        initialRegion={{
                            latitude: -10.931129454266047,
                            longitude: -61.927419334264975,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008
                        }}
                        style={styles.map}
                        onPress={SelectMapPosition}
                    >
                        {(Latitude !== undefined && Longitude !== undefined) && (
                            <Marker
                                icon={mapMarker}
                                coordinate={{
                                    latitude: Latitude,
                                    longitude: Longitude,
                                }}
                            />
                        )}
                    </MapView>
                    <TouchableOpacity
                        style={styles.btnLocation}
                        onPress={GetGeoLocation}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Pegar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Rota"
                        placeholderTextColor="black"
                        onChangeText={setRota}
                        value={Rota}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Capacidade"
                        placeholderTextColor="black"
                        onChangeText={(value) => setCapacidade(Number(value))}
                        value={Capacidade !== undefined ? String(Capacidade) : ""}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Média Diária"
                        placeholderTextColor="black"
                        onChangeText={(value) => setMediaDiaria(Number(value))}
                        value={MediaDiaria !== undefined ? String(MediaDiaria) : ""}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.control}>
                    <RNPickerSelect
                        onValueChange={(value) => setTipoTanque(value)}
                        placeholder={{
                            label: "Tipo de Tanque",
                            value: undefined
                        }}
                        items={[
                            {
                                label: "Individual",
                                value: 1
                            },
                            {
                                label: "Comunitário",
                                value: 2
                            }
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
                        onChangeText={setNumeroSerie}
                        value={NumeroSerie}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Marca"
                        placeholderTextColor="black"
                        onChangeText={setMarca}
                        value={Marca}
                    />
                </View>
                <View style={styles.br} />

            </Panel>
        </Container>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    label: {
        textAlign: 'left',
        width: '100%',
        marginBottom: 5,
        paddingLeft: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4a4a4a'
    },
    control: {
        width: '100%',
        marginBottom: 15
    },
    br: {
        height: 60
    },
    map: {
        width: '100%',
        height: 300
    },
    viewMap: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 12
    },
    btnLocation: {
        width: '100%',
        height: 40,
        backgroundColor: '#3da5dc',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const customPickerStyles = StyleSheet.create({
    inputIOS: {
        color: 'black',
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    inputAndroid: {
        color: 'black',
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    placeholder: {
        color: 'black'
    }
});

export default TanqueAdd;