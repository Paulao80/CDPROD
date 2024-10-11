import { ChangeEvent, useEffect, useState } from "react";
import Form, { FormInstance } from "rc-field-form";
import { useNavigate } from "react-router-dom";
import { Error, TanqueError, Tanque } from "../Interfaces/index";
import * as service from "../Services/TanqueService";

interface UseTanque {
  form: FormInstance;
  tanques: Tanque[];
  errorForm?: Error<TanqueError>;
  onFinish(): Promise<void>;
  onEdit(): Promise<void>;
  onDelete(id?: number): Promise<boolean>;
  getById(id: number): Promise<Tanque | null>;
  list(): Promise<Tanque[]>;
  preview: string[];
  SelectedImages(event: ChangeEvent<HTMLInputElement>): void;
  Latitude: number;
  Longitude: number;
  setPosition(lat: number, lng: number): void;
}

const useTanque = (id?: number, load?: boolean): UseTanque => {
  const navigate = useNavigate();
  const [form] = Form.useForm<Tanque>();

  const [errorForm, setErrorForm] = useState<Error<TanqueError>>();
  const [tanques, setTanques] = useState<Tanque[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [Latitude, setLatitude] = useState<number>(0);
  const [Longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    form.setFieldsValue({
      Latitude,
      Longitude,
    });
  }, [Latitude, Longitude, form]);

  useEffect(() => {
    if (id) {
      getById(id).then((res) => {
        if (res) {
          form.setFieldsValue(res);
          if (res?.Latitude) setLatitude(res?.Latitude);
          if (res?.Longitude) setLongitude(res?.Longitude);
          if (res?.FotoPath) setPreview([res?.FotoPath]);
        } else {
          navigate("/tanque");
        }
      });
    }
  }, [id, navigate, form]);

  useEffect(() => {
    if (load) {
      list().then((res) => {
        setTanques(res);
      });
    }
  }, [load]);

  async function onFinish(): Promise<void> {
    try {
      const { status } = await service.create(getFormData());
      status === 201
        ? redirect()
        : alert("Não foi possivel adicionar o Tanque");
    } catch (error: any) {
      setErrorForm(error.response.data);
    }
  }

  async function onEdit(): Promise<void> {
    try {
      const { status } = await service.edit(getFormData());
      status === 200
        ? redirect()
        : alert("Não foi possivel atualizar o Tanque");
    } catch (error: any) {
      setErrorForm(error.response.data);
    }
  }

  async function onDelete(id?: number): Promise<boolean> {
    try {
      if (id) {
        const { data } = await service.del(id);
        setTanques((prev) => prev.filter((t) => t.TanqueId !== id));

        alert(data?.Message);

        return true;
      }

      return false;
    } catch (error: any) {
      alert(error.response.data.Message);
      return false;
    }
  }

  async function getById(id: number): Promise<Tanque | null> {
    try {
      const { data } = await service.getById(id);
      return data !== undefined ? data : null;
    } catch (error: any) {
      return null;
    }
  }

  async function list(): Promise<Tanque[]> {
    try {
      const { data } = await service.list();
      return data !== undefined ? data : [];
    } catch (error) {
      return [];
    }
  }

  function SelectedImages(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) {
      return;
    }

    const imagens = Array.from(event.target.files);

    form.setFieldsValue({
      image: imagens,
    });

    const imagensPreview = imagens.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreview(imagensPreview);
  }

  function getFormData(): FormData {
    const data = new FormData();
    const formDados = form.getFieldsValue();

    if (id) data.append("TanqueId", String(id));
    if (formDados?.Rota) data.append("Rota", formDados?.Rota);
    if (formDados?.Capacidade)
      data.append("Capacidade", String(formDados?.Capacidade));
    if (formDados?.MediaDiaria)
      data.append("MediaDiaria", String(formDados?.MediaDiaria));
    if (formDados?.TipoTanque)
      data.append("TipoTanque", String(formDados?.TipoTanque));
    if (formDados?.NumeroSerie)
      data.append("NumeroSerie", formDados?.NumeroSerie);
    if (formDados?.Marca) data.append("Marca", formDados?.Marca);
    if (formDados?.Latitude)
      data.append("Latitude", String(formDados?.Latitude));
    if (formDados?.Longitude)
      data.append("Longitude", String(formDados?.Longitude));
    if (formDados?.image)
      formDados?.image.forEach((img) => {
        data.append("image", img);
      });

    return data;
  }

  function setPosition(lat: number, lng: number): void {
    setLatitude(lat);
    setLongitude(lng);
  }

  function redirect() {
    navigate("/tanque");
  }

  return {
    form,
    errorForm,
    tanques,
    onFinish,
    onEdit,
    onDelete,
    getById,
    list,
    preview,
    SelectedImages,
    Latitude,
    Longitude,
    setPosition,
  };
};

export default useTanque;
