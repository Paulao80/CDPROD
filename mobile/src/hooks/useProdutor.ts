import { useMemo, useState } from "react";
import { Produtor } from "../interfaces";
import { RecursivePartial } from "../Types";
import * as service from "../services/ProdutorService";
import { formatDataToApi, formatDataToApp } from "../utils/formatData";

interface UseProdutor {
  produtores: Produtor[];
  form: FormProdutorType;
  list(): Promise<Produtor[] | undefined>;
  onSearch(): Promise<void>;
  onAdd(): Promise<boolean>;
  onDel(id: number): Promise<boolean>;
  onEdit(): Promise<boolean>;
  getById(id: number): Promise<Produtor | undefined>;
  formatFromApiToApp(produtor?: Produtor): Produtor | undefined;
}

export interface FormProdutorType {
  setForm: (dados: RecursivePartial<Produtor>) => void;
  formValues: RecursivePartial<Produtor>;
  resetForm(): void;
}

const useProdutor = (): UseProdutor => {
  const [formValues, setFormValues] = useState<RecursivePartial<Produtor>>({});
  const [produtores, setProdutores] = useState<Produtor[]>([]);

  function setForm(dados: RecursivePartial<Produtor>) {
    setFormValues((prev) => {
      return { ...prev, ...dados };
    });
  }

  function resetForm() {
    setFormValues({});
  }

  const form: FormProdutorType = useMemo(() => {
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
      console.log("🚀 ~ file: useProdutor.ts ~ line 34 ~ getList ~ err", err);
      return [];
    }
  }

  async function onSearch() {
    list().then((resp) => {
      if (resp) setProdutores(resp);
    });
  }

  async function onAdd() {
    try {
      const { data } = await service.create(formatFromAppToApi(formValues));
      if (data) setProdutores((prev) => prev.concat(data));
      return true;
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: useProdutor.ts ~ line 59 ~ onAdd ~ response",
        response
      );
      return false;
    }
  }

  async function onEdit() {
    try {
      const { data } = await service.edit(formatFromAppToApi(formValues));
      if (data) {
        const itemIndex = produtores.findIndex(
          (item) => item.ProdutorId === data.ProdutorId
        );
        const updatedListItems = [...produtores];
        updatedListItems[itemIndex] = data;
        setProdutores(updatedListItems);
      }

      return true;
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: useProdutor.ts ~ line 59 ~ onAdd ~ response",
        response
      );
      return false;
    }
  }

  async function onDel(id: number) {
    try {
      const { data } = await service.del(id);
      console.log("🚀 ~ file: useProdutor.ts ~ line 72 ~ onDel ~ data", data);

      setProdutores((prev) => {
        return prev.filter((item) => item.ProdutorId !== id);
      });
      return true;
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: useProdutor.ts ~ line 59 ~ onAdd ~ response",
        response
      );
      return false;
    }
  }

  async function getById(id: number) {
    try {
      const { data } = await service.getById(id);
      return formatFromApiToApp(data);
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: useProdutor.ts ~ line 59 ~ onAdd ~ response",
        response
      );
      return undefined;
    }
  }

  function formatFromAppToApi(
    formValues: RecursivePartial<Produtor>
  ): Produtor {
    const { DataExp, DataNasc, ...resto } = formValues;

    return {
      ...resto,
      DataNasc: formatDataToApi(DataNasc),
      DataExp: formatDataToApi(DataExp),
    };
  }

  function formatFromApiToApp(produtor?: Produtor): Produtor | undefined {
    if (!produtor) return undefined;

    const { DataExp, DataNasc, ...resto } = produtor;

    return {
      ...resto,
      DataNasc: formatDataToApp(DataNasc),
      DataExp: formatDataToApp(DataExp),
    };
  }

  return {
    produtores,
    form,
    list,
    onSearch,
    onAdd,
    onDel,
    onEdit,
    getById,
    formatFromApiToApp,
  };
};

export { useProdutor };
