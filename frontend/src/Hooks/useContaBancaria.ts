import { useEffect, useState } from "react";
import Form, { FormInstance } from "rc-field-form";
import { useHistory } from "react-router-dom";
import {
  Error,
  ContaBancariaError,
  ContasBancarias,
  Produtor,
} from "../Interfaces/index";
import * as service from "../Services/ContaService";
import useProdutor from "./useProdutor";

interface UseContaBancaria {
  form: FormInstance;
  contasBancarias: ContasBancarias[];
  errorForm?: Error<ContaBancariaError>;
  onFinish(): Promise<boolean>;
  onEdit(): Promise<boolean>;
  onDelete(id?: number): Promise<boolean>;
  getById(id: number): Promise<ContasBancarias | null>;
  list(): Promise<ContasBancarias[]>;
  listByProdutorId(id: number): Promise<ContasBancarias[]>;
  onChangePertenceProdutor(): void;
  produtor: Produtor;
  pertenceProdutor: boolean;
  setFormData(data: ContasBancarias): void;
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
  const [produtor, setProdutor] = useState<Produtor>({});
  const [pertenceProdutor, setPertenceProdutor] = useState<boolean>(false);

  const { getById: getProdutoById } = useProdutor();

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
    } else if (load) {
      history.push(`/produtor`);
    }
  }, [load, produtorId, history]);

  useEffect(() => {
    if (produtorId) {
      getProdutoById(produtorId).then((resp) => {
        if (resp) setProdutor(resp);
        else history.push(`/produtor`);
      });
    }
    // eslint-disable-next-line
  }, [load, produtorId, history]);

  async function onFinish(): Promise<boolean> {
    try {
      const formDados: ContasBancarias = {
        ...form.getFieldsValue(),
        Produtor: produtor,
      };
      const { status, data } = await service.create(formDados);
      if (status !== 201) {
        alert("Não foi possivel adicionar a conta bancária");
        return false;
      }
      if (data) setContasBancarias((prev) => prev.concat(data));
      form.resetFields();
      return true;
    } catch (error: any) {
      setErrorForm(error.response.data);
      return false;
    }
  }

  async function onEdit(): Promise<boolean> {
    try {
      const formDados = form.getFieldsValue();
      const { status, data } = await service.edit(formDados);

      if (status !== 200) {
        alert("Não foi possivel atualizar a conta bancária");
        return false;
      }

      if (data) {
        const updatedContas = [...contasBancarias];
        updatedContas[
          contasBancarias.findIndex((item) => item.ContaId === data?.ContaId)
        ] = {
          ...data,
        };
        setContasBancarias(updatedContas);
      }

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

  function onChangePertenceProdutor() {
    const formDados = form.getFieldsValue();
    setPertenceProdutor(formDados.PertenceProdutor ? true : false);
    if (formDados.PertenceProdutor)
      form.setFieldsValue({ NomePertence: produtor.Nome });
    else form.setFieldsValue({ NomePertence: "" });
  }

  function setFormData(data: ContasBancarias): void {
    setPertenceProdutor(data.PertenceProdutor ? true : false);
    form.setFieldsValue(data);
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
    onChangePertenceProdutor,
    produtor,
    pertenceProdutor,
    setFormData,
  };
};

export default useContaBancaria;
