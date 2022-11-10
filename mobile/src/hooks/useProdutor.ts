import { useMemo, useState } from "react";
import { Produtor } from "../interfaces";
import { RecursivePartial } from "../Types";
import * as service from "../services/ProdutorService";

interface UseProdutor {
  produtores: Produtor[];
  form: FormType;
  list(): Promise<Produtor[] | undefined>;
  onSearch(): Promise<void>;
  onAdd(): Promise<boolean>;
}

interface FormType {
  setForm: (dados: RecursivePartial<Produtor>) => void;
  FormValues: RecursivePartial<Produtor>;
}

const useProdutor = (): UseProdutor => {
  const [FormValues, setFormValues] = useState<RecursivePartial<Produtor>>({});
  const [produtores, setProdutores] = useState<Produtor[]>([]);

  function setForm(dados: RecursivePartial<Produtor>) {
    setFormValues((prev) => {
      return { ...prev, ...dados };
    });
  }

  const form: FormType = useMemo(() => {
    return {
      setForm,
      FormValues,
    };
  }, [FormValues]);

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
      const { data } = await service.create(FormValues);
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

  return {
    produtores,
    form,
    list,
    onSearch,
    onAdd,
  };
};

export { useProdutor };
