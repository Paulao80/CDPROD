import { useEffect, useState } from "react";
import Form, { FormInstance } from "rc-field-form";
import { useHistory } from "react-router-dom";
import {
  Error,
  ContaBancariaError,
  ContasBancarias,
} from "../Interfaces/index";
import * as service from "../Services/ContaService";

interface UseContaBancaria {
  form: FormInstance;
  contasBancarias: ContasBancarias[];
  errorForm?: Error<ContaBancariaError>;
  onFinish(): Promise<void>;
  onEdit(): Promise<void>;
  onDelete(id?: number): Promise<boolean>;
  getById(id: number): Promise<ContasBancarias | null>;
  list(): Promise<ContasBancarias[]>;
  listByProdutorId(id: number): Promise<ContasBancarias[]>;
}

const useContaBancaria = (
  id?: number,
  produtorId?: number,
  load?: boolean
): UseContaBancaria => {
  const history = useHistory();
  const [form] = Form.useForm<ContasBancarias>();

  const [errorForm, setErrorForm] = useState<Error<ContaBancariaError>>();
  const [contasBancarias, setContasBancarias] = useState<ContasBancarias[]>([]);

  useEffect(() => {
    if (id) {
      getById(id).then((res) => {
        if (res) {
          form.setFieldsValue(res);
        } else {
          history.push(`/produtor/contas/${produtorId}`);
        }
      });
    }
  }, [id, history, form, produtorId]);

  useEffect(() => {
    if (load && produtorId) {
      listByProdutorId(produtorId).then((res) => {
        setContasBancarias(res);
      });
    } else if(load) {
      history.push(`/produtor`);
    }
  }, [load, produtorId, history]);

  async function onFinish(): Promise<void> {
    try {
      const formDados = form.getFieldsValue();
      const { status } = await service.create(formDados);
      status === 201
        ? redirect()
        : alert("Não foi possivel adicionar a conta bancária");
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
        : alert("Não foi possivel atualizar a conta bancária");
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

  async function getById(id: number): Promise<ContasBancarias | null> {
    try {
      const { data } = await service.getById(id);
      return data !== undefined ? data : null;
    } catch (error: any) {
      return null;
    }
  }

  async function list(): Promise<ContasBancarias[]> {
    try {
      const { data } = await service.list();
      return data !== undefined ? data : [];
    } catch (error) {
      return [];
    }
  }

  async function listByProdutorId(id: number): Promise<ContasBancarias[]> {
    try {
      const { data } = await service.listByProdutorId(id);
      return data !== undefined ? data : [];
    } catch (error) {
      return [];
    }
  }

  function redirect() {
    history.push(`/produtor/contas/${produtorId}`);
  }

  return {
    form,
    contasBancarias,
    errorForm,
    onFinish,
    onEdit,
    onDelete,
    getById,
    list,
    listByProdutorId,
  };
};

export default useContaBancaria;
