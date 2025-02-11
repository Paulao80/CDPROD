import { useEffect, useState } from "react";
import Form, { FormInstance } from "rc-field-form";
import { useNavigate } from "react-router-dom";
import {
  Error,
  ProdutorTanqueError,
  ProdutorTanque,
  Tanque,
} from "../Interfaces/index";
import * as service from "../Services/ProdutoTanqueService";
import useTanque from "./useTanque";
import { formatValueToBool } from "../Util/Functions";

interface UseProdutorTanque {
  form: FormInstance;
  produtoresTanques: ProdutorTanque[];
  errorForm?: Error<ProdutorTanqueError>;
  tanque: Tanque;
  onFinish(): Promise<boolean>;
  onDelete(id?: number): Promise<boolean>;
  getById(id: number): Promise<ProdutorTanque | null>;
  list(): Promise<ProdutorTanque[]>;
  listByTanqueId(id: number): Promise<ProdutorTanque[]>;
}

const useProdutorTanque = (
  tanqueId?: number,
  load?: boolean
): UseProdutorTanque => {
  const navigate = useNavigate();
  const [form] = Form.useForm<ProdutorTanque>();

  const [errorForm, setErrorForm] = useState<Error<ProdutorTanqueError>>();
  const [produtoresTanques, setProdutoresTanques] = useState<ProdutorTanque[]>(
    []
  );
  const [tanque, setTanque] = useState<Tanque>({});

  const { getById: getTanqueById } = useTanque();

  useEffect(() => {
    if (load && tanqueId) {
      listByTanqueId(tanqueId).then((res) => {
        setProdutoresTanques(res);
      });
    } else if (load) {
      navigate(`/tanque`);
    }
  }, [load, tanqueId, navigate]);

  useEffect(() => {
    if (tanqueId) {
      getTanqueById(tanqueId).then((resp) => {
        if (resp) setTanque(resp);
        else navigate("/tanque");
      });
    }
  }, [load, tanqueId, navigate, getTanqueById]);

  async function onFinish(): Promise<boolean> {
    try {
      const { Responsavel, ...resto } = form.getFieldsValue();
      const formDados: ProdutorTanque = {
        ...resto,
        Responsavel: formatValueToBool(Responsavel),
        Tanque: tanque,
      };

      const { status, data } = await service.create(formDados);

      if (status !== 201) {
        alert("Não foi possivel adicionar a produtor ao tanque");
        return false;
      }

      if (data) setProdutoresTanques((prev) => prev.concat(data));
      form.resetFields();
      return true;
    } catch (error: any) {
      setErrorForm(error.response.data);
      return false;
    }
  }

  async function onDelete(id?: number): Promise<boolean> {
    try {
      if (id) {
        const { data } = await service.del(id);
        setProdutoresTanques((prev) =>
          prev.filter((pt) => pt.ProdutorTanqueId !== id)
        );

        alert(data?.Message);

        return true;
      }

      return false;
    } catch (error: any) {
      alert(error.response.data.Message);
      return false;
    }
  }

  async function getById(id: number): Promise<ProdutorTanque | null> {
    try {
      const { data } = await service.getById(id);
      return data !== undefined ? data : null;
    } catch (error: any) {
      return null;
    }
  }

  async function list(): Promise<ProdutorTanque[]> {
    try {
      const { data } = await service.list();
      return data !== undefined ? data : [];
    } catch (error) {
      return [];
    }
  }

  async function listByTanqueId(id: number): Promise<ProdutorTanque[]> {
    try {
      const { data } = await service.listByTanqueId(id);
      return data !== undefined ? data : [];
    } catch (error) {
      return [];
    }
  }

  return {
    form,
    produtoresTanques,
    errorForm,
    tanque,
    onFinish,
    onDelete,
    getById,
    list,
    listByTanqueId,
  };
};

export default useProdutorTanque;
