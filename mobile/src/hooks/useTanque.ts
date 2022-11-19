import { useMemo, useState } from "react";
import { Tanque } from "../interfaces";
import { ImageType, RecursivePartial } from "../Types";
import * as service from "../services/TanqueService";
import FormData from "form-data";
import * as DocumentPicker from "expo-document-picker";
import * as Location from "expo-location";
import { MapEvent, Region } from "react-native-maps";

export interface FormTanqueType {
  setForm: (dados: RecursivePartial<Tanque>) => void;
  formValues: RecursivePartial<Tanque>;
  resetForm(): void;
}

interface UseTanque {
  tanques: Tanque[];
  form: FormTanqueType;
  list(): Promise<Tanque[] | undefined>;
  onSearch(): Promise<void>;
  onAdd(): Promise<boolean>;
  onDel(id: number): Promise<boolean>;
  onEdit(): Promise<boolean>;
  getById(id: number): Promise<Tanque | undefined>;
  pickFile(): Promise<void>;
  imageShow: string | undefined;
  region: Region | undefined;
  selectMapPosition(event: MapEvent): void;
  getGeoLocation: () => Promise<void>;
  setImageShowPath(path?: string): void;
  setRegionLocation(latitude?: number, longitude?: number): void;
}

const useTanque = (): UseTanque => {
  const [formValues, setFormValues] = useState<RecursivePartial<Tanque>>({});
  const [tanques, setTanques] = useState<Tanque[]>([]);
  const [imageShow, setImageShow] = useState<string>();
  const [region, setRegion] = useState<Region>();

  function setImageShowPath(path?: string) {
    setImageShow(path);
  }

  function setRegionLocation(latitude?: number, longitude?: number) {
    if (latitude && longitude)
      setRegion({
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        latitude,
        longitude,
      });
  }

  function setForm(dados: RecursivePartial<Tanque>) {
    setFormValues((prev) => {
      return { ...prev, ...dados };
    });
  }

  function resetForm() {
    setFormValues({});
    setImageShow(undefined);
    setRegion(undefined);
  }

  const form: FormTanqueType = useMemo(() => {
    return {
      setForm,
      formValues,
      resetForm,
    };
  }, [formValues]);

  async function list() {
    try {
      const { data } = await service.list();
      return data;
    } catch (err) {
      console.log("🚀 ~ file: useTanque.ts ~ line 52 ~ list ~ err", err);
      return [];
    }
  }

  async function onSearch() {
    list().then((resp) => {
      if (resp) setTanques(resp);
    });
  }

  function selectMapPosition(event: MapEvent) {
    form.setForm({
      Latitude: event.nativeEvent.coordinate.latitude,
      Longitude: event.nativeEvent.coordinate.longitude,
    });

    setRegion({
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  }

  const getGeoLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const location = await Location.getCurrentPositionAsync({});

    if (location?.coords.latitude && location?.coords.longitude)
      setRegion({
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });

    form.setForm({
      Latitude: location?.coords.latitude,
      Longitude: location?.coords.longitude,
    });
  };

  async function pickFile() {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (response.type === "success") {
        setImageShow(response.uri);
        const image: ImageType[] = [];
        image.push({
          name: response.name,
          type: "image/" + response.uri.slice(-3),
          uri: response.uri,
        });
        form.setForm({ image });
      }
    } catch (err) {
      console.log("🚀 ~ file: add.tsx ~ line 83 ~ pickFile ~ err", err);
    }
  }

  async function onAdd() {
    try {
      const { data } = await service.create(getFormData());
      if (data) setTanques((prev) => prev.concat(data));
      return true;
    } catch (err: any) {
      const response = err?.response?.data;
      console.log(
        "🚀 ~ file: useTanque.ts ~ line 68 ~ onAdd ~ response",
        response
      );
      return false;
    }
  }

  async function onEdit() {
    try {
      const { data } = await service.edit(getFormData());
      if (data) {
        const itemIndex = tanques.findIndex(
          (item) => item.TanqueId === data.TanqueId
        );
        const updatedListItems = [...tanques];
        updatedListItems[itemIndex] = data;
        setTanques(updatedListItems);
      }

      return true;
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: useTanque.ts ~ line 88 ~ onEdit ~ response",
        response
      );
      return false;
    }
  }

  async function onDel(id: number) {
    try {
      const { data } = await service.del(id);

      setTanques((prev) => {
        return prev.filter((item) => item.TanqueId !== id);
      });
      return true;
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: useTanque.ts ~ line 109 ~ onDel ~ response",
        response
      );
      return false;
    }
  }

  async function getById(id: number) {
    try {
      const { data } = await service.getById(id);
      return data;
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: useTanque.ts ~ line 120 ~ getById ~ response",
        response
      );
      return undefined;
    }
  }

  function getFormData(): FormData {
    const data = new FormData();

    if (formValues?.TanqueId)
      data.append("TanqueId", String(formValues?.TanqueId));
    if (formValues?.Rota) data.append("Rota", formValues?.Rota);
    if (formValues?.Capacidade)
      data.append("Capacidade", String(formValues?.Capacidade));
    if (formValues?.MediaDiaria)
      data.append("MediaDiaria", String(formValues?.MediaDiaria));
    if (formValues?.TipoTanque)
      data.append("TipoTanque", String(formValues?.TipoTanque));
    if (formValues?.NumeroSerie)
      data.append("NumeroSerie", formValues?.NumeroSerie);
    if (formValues?.Marca) data.append("Marca", formValues?.Marca);
    if (formValues?.Latitude)
      data.append("Latitude", String(formValues?.Latitude));
    if (formValues?.Longitude)
      data.append("Longitude", String(formValues?.Longitude));
    if (formValues?.image)
      formValues?.image?.forEach((img) => {
        data.append("image", img);
      });

    return data;
  }

  return {
    tanques,
    form,
    list,
    onSearch,
    onAdd,
    onDel,
    onEdit,
    getById,
    pickFile,
    imageShow,
    region,
    selectMapPosition,
    getGeoLocation,
    setImageShowPath,
    setRegionLocation,
  };
};

export { useTanque };
