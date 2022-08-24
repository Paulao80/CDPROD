import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Error, TanqueError, Tanque } from "../Interfaces/index";
import * as service from "../Services/TanqueService";

interface UseTanque {
  form: Tanque;
  setForm: Dispatch<SetStateAction<Tanque>>;
  tanques: Tanque[];
  errorForm?: Error<TanqueError>;
  onFinish(): Promise<void>;
  onEdit(): Promise<void>;
  onDelete(id?: number): Promise<boolean>;
  getById(id: number): Promise<Tanque | null>;
  list(): Promise<Tanque[]>;
}

const useTanque = (id?: number, load?: boolean): UseTanque => {
  const history = useHistory();
  const [form, setForm] = useState<Tanque>({
    Capacidade: 0,
    FotoPath: undefined,
    image: [],
    Latitude: 0,
    Longitude: 0,
    Marca: "",
    MediaDiaria: 0,
    NumeroSerie: "",
    Rota: "",
    TipoTanque: 0,
  });
  const [errorForm, setErrorForm] = useState<Error<TanqueError>>();
  const [tanques, setTanques] = useState<Tanque[]>([]);

  useEffect(() => {
    if (id) {
      getById(id).then((res) => {
        if (res) {
          setForm(res);
        } else {
          history.push("/tanque");
        }
      });
    }
  }, [id, history]);

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

  function getFormData(): FormData {
    const data = new FormData();

    if (id) data.append("TanqueId", String(id));
    if (form?.Rota) data.append("Rota", form?.Rota);
    if (form?.Capacidade) data.append("Capacidade", String(form?.Capacidade));
    if (form?.MediaDiaria)
      data.append("MediaDiaria", String(form?.MediaDiaria));
    if (form?.TipoTanque) data.append("TipoTanque", String(form?.TipoTanque));
    if (form?.NumeroSerie) data.append("NumeroSerie", form?.NumeroSerie);
    if (form?.Marca) data.append("Marca", form?.Marca);
    if (form?.Latitude) data.append("Latitude", String(form?.Latitude));
    if (form?.Longitude) data.append("Longitude", String(form?.Longitude));
    if (form?.image)
      form?.image.forEach((img) => {
        data.append("image", img);
      });

    return data;
  }

  function redirect() {
    history.push("/tanque");
  }

  return {
    form,
    setForm,
    errorForm,
    tanques,
    onFinish,
    onEdit,
    onDelete,
    getById,
    list,
  };
};

export default useTanque;
