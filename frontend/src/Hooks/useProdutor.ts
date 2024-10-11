import { useEffect, useState } from "react";
import Form, { FormInstance } from "rc-field-form";
import { useNavigate } from "react-router-dom";
import { Error, ProdutorError, Produtor } from "../Interfaces/index";
import * as service from "../Services/ProdutorService";
import dayjs from "dayjs";

interface UseProdutor {
  form: FormInstance;
  produtores: Produtor[];
  errorForm?: Error<ProdutorError>;
  onFinish(): Promise<void>;
  onEdit(): Promise<void>;
  onDelete(id?: number): Promise<boolean>;
  getById(id: number): Promise<Produtor | null>;
  list(): Promise<Produtor[]>;
}

const useProdutor = (id?: number, load?: boolean): UseProdutor => {
  const navigate = useNavigate();
  const [form] = Form.useForm<Produtor>();

  const [errorForm, setErrorForm] = useState<Error<ProdutorError>>();
  const [produtores, setProdutores] = useState<Produtor[]>([]);

  useEffect(() => {
    if (id) {
      getById(id).then((res) => {
        if (res) {
          form.setFieldsValue(formatFromApiToApp(res));
        } else {
          navigate("/produtor");
        }
      });
    }
  }, [id, navigate, form]);

  useEffect(() => {
    if (load) {
      list().then((res) => {
        setProdutores(res);
      });
    }
  }, [load]);

  async function onFinish(): Promise<void> {
    try {
      const formDados = form.getFieldsValue();
      const { status } = await service.create(formDados);
      status === 201
        ? redirect()
        : alert("Não foi possivel adicionar o Produtor");
    } catch (error: any) {
      setErrorForm(error.response.data);
    }
  }

  async function onEdit(): Promise<void> {
    try {
      const formDados = form.getFieldsValue();
      const { status } = await service.edit(formDados);
      status === 200
        ? redirect()
        : alert("Não foi possivel atualizar o Produtor");
    } catch (error: any) {
      setErrorForm(error.response.data);
    }
  }

  async function onDelete(id?: number): Promise<boolean> {
    try {
      if (id) {
        const { data } = await service.del(id);
        setProdutores((prev) => prev.filter((p) => p.ProdutorId !== id));

        alert(data?.Message);

        return true;
      }

      return false;
    } catch (error: any) {
      alert(error.response.data.Message);
      return false;
    }
  }

  async function getById(id: number): Promise<Produtor | null> {
    try {
      const { data } = await service.getById(id);
      return data !== undefined ? data : null;
    } catch (error: any) {
      return null;
    }
  }

  async function list(): Promise<Produtor[]> {
    try {
      const { data } = await service.list();
      return data !== undefined ? data : [];
    } catch (error) {
      return [];
    }
  }

  function redirect() {
    navigate("/produtor");
  }

  function formatFromApiToApp(produtor: Produtor): Produtor {
    return {
      ...produtor,
      DataNasc: dayjs(produtor.DataNasc),
      DataExp: dayjs(produtor.DataExp),
    };
  }

  return {
    form,
    produtores,
    onFinish,
    onEdit,
    onDelete,
    errorForm,
    getById,
    list,
  };
};

export default useProdutor;
