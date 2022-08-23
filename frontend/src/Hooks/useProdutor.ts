import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Error, ProdutorError, Produtor } from "../Interfaces/index";
import * as service from "../Services/ProdutorService";

interface UseProdutor {
  form: Produtor;
  setForm: Dispatch<SetStateAction<Produtor>>;
  produtores: Produtor[];
  errorForm?: Error<ProdutorError>;
  onFinish(): Promise<void>;
  onEdit(): Promise<void>;
  onDelete(id?: number): Promise<boolean>;
  getById(id: number): Promise<Produtor | null>;
}

const useProdutor = (id?: number, load?: boolean): UseProdutor => {
  const history = useHistory();
  const [form, setForm] = useState<Produtor>({
    Nome: "",
    DataNasc: "",
    TipoPessoa: 0,
    Nacionalidade: "",
    CpfCnpj: "",
    RG: "",
    OrgaoExp: "",
    EstadoExp: "",
    DataExp: "",
    EstadoCivil: 0,
    Telefone: "",
    UltLaticinio: "",
  });
  const [errorForm, setErrorForm] = useState<Error<ProdutorError>>();
  const [produtores, setProdutores] = useState<Produtor[]>([]);

  useEffect(() => {
    if (id) {
      getById(id).then((res) => {
        if (res) {
          setForm(res);
        } else {
          history.push("/produtor");
        }
      });
    }
  }, [id, history]);

  useEffect(() => {
    if (load) {
      list().then((res) => {
        setProdutores(res);
      });
    }
  }, [load]);

  async function onFinish(): Promise<void> {
    try {
      const { status } = await service.create(form);
      status === 201
        ? redirect()
        : alert("Não foi possivel adicionar o Produtor");
    } catch (error: any) {
      setErrorForm(error.response.data);
    }
  }

  async function onEdit(): Promise<void> {
    try {
      const { status } = await service.edit(form);
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

  const redirect = () => {
    history.push("/produtor");
  };

  return {
    form,
    setForm,
    produtores,
    onFinish,
    onEdit,
    onDelete,
    errorForm,
    getById,
  };
};

export default useProdutor;
