import Form, { FormInstance } from "rc-field-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error, PropriedadeError, Propriedade } from "../Interfaces/index";
import * as service from "../Services/PropriedadeService";

interface UsePropriedade {
  form: FormInstance;
  propriedades: Propriedade[];
  errorForm?: Error<PropriedadeError>;
  onFinish(): Promise<void>;
  onEdit(): Promise<void>;
  onDelete(id?: number): Promise<boolean>;
  getById(id: number): Promise<Propriedade | null>;
  list(): Promise<Propriedade[]>;
}

const usePropriedade = (id?: number, load?: boolean): UsePropriedade => {
  const navigate = useNavigate();
  const [form] = Form.useForm<Propriedade>();

  const [errorForm, setErrorForm] = useState<Error<PropriedadeError>>();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);

  useEffect(() => {
    if (id) {
      getById(id).then((res) => {
        if (res) {
          form.setFieldsValue(res);
        } else {
          navigate("/propriedade");
        }
      });
    }
  }, [id, navigate, form]);

  useEffect(() => {
    if (load) {
      list().then((res) => {
        setPropriedades(res);
      });
    }
  }, [load]);

  async function onFinish(): Promise<void> {
    try {
      const formDados = form.getFieldsValue();
      const { status } = await service.create(formDados);
      status === 201
        ? redirect()
        : alert("Não foi possivel adicionar a Propriedade");
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
        : alert("Não foi possivel atualizar a Propriedade");
    } catch (error: any) {
      setErrorForm(error.response.data);
    }
  }

  async function onDelete(id?: number): Promise<boolean> {
    try {
      if (id) {
        const { data } = await service.del(id);
        setPropriedades((prev) => prev.filter((p) => p.PropriedadeId !== id));

        alert(data?.Message);

        return true;
      }

      return false;
    } catch (error: any) {
      alert(error.response.data.Message);
      return false;
    }
  }

  async function getById(id: number): Promise<Propriedade | null> {
    try {
      const { data } = await service.getById(id);
      return data !== undefined ? data : null;
    } catch (error: any) {
      return null;
    }
  }

  async function list(): Promise<Propriedade[]> {
    try {
      const { data } = await service.list();
      return data !== undefined ? data : [];
    } catch (error) {
      return [];
    }
  }

  function redirect() {
    navigate("/propriedade");
  }

  return {
    form,
    propriedades,
    errorForm,
    onFinish,
    onEdit,
    onDelete,
    getById,
    list,
  };
};

export default usePropriedade;
