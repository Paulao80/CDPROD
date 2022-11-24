import { useMemo, useState } from "react";
import { ProdutoresTanques } from "../interfaces";
import { RecursivePartial } from "../Types";
import * as service from "../services/ProdutorTanqueService";

export interface FormProdTanqueType {
  setForm: (dados: RecursivePartial<ProdutoresTanques>) => void;
  formValues: RecursivePartial<ProdutoresTanques>;
  resetForm(): void;
}

interface UseProdTanque {
  prodTanques: ProdutoresTanques[];
  form: FormProdTanqueType;
  list(): Promise<ProdutoresTanques[] | undefined>;
  listByTanqueId(id: number): Promise<ProdutoresTanques[] | undefined>;
  onSearch(): Promise<void>;
  onSearchByTanqueId(id: number): Promise<void>;
  onAdd(): Promise<boolean>;
  onDel(id: number): Promise<boolean>;
  getById(id: number): Promise<ProdutoresTanques | undefined>;
}

const useProdTanque = (): UseProdTanque => {
  const [formValues, setFormValues] = useState<
    RecursivePartial<ProdutoresTanques>
  >({});

  const [prodTanques, setProdTanques] = useState<ProdutoresTanques[]>([]);

  function setForm(dados: RecursivePartial<ProdutoresTanques>) {
    setFormValues((prev) => {
      return { ...prev, ...dados };
    });
  }

  function resetForm() {
    setFormValues({});
  }

  const form: FormProdTanqueType = useMemo(() => {
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
      console.log("🚀 ~ file: useProdTanque.ts ~ line 52 ~ list ~ err", err);
      return [];
    }
  }

  async function listByTanqueId(id: number) {
    try {
      const { data } = await service.listByTanqueId(id);
      return data;
    } catch (err) {
      console.log(
        "🚀 ~ file: useProdTanque.ts ~ line 62 ~ listByTanqueId ~ err",
        err
      );
      return [];
    }
  }

  async function onSearch() {
    list().then((resp) => {
      if (resp) setProdTanques(resp);
    });
  }

  async function onSearchByTanqueId(id: number) {
    listByTanqueId(id).then((resp) => {
      if (resp) setProdTanques(resp);
    });
  }

  async function onAdd() {
    try {
      const { data } = await service.create(formValues);
      if (data) setProdTanques((prev) => prev.concat(data));
      return true;
    } catch (err: any) {
      const response = err?.response?.data;
      console.log(
        "🚀 ~ file: useProdTanque.ts ~ line 91 ~ onAdd ~ response",
        response
      );
      return false;
    }
  }

  async function onDel(id: number) {
    try {
      await service.del(id);

      setProdTanques((prev) => {
        return prev.filter((item) => item.ProdutorTanqueId !== id);
      });
      return true;
    } catch (err: any) {
      const response = err?.response?.data;
      console.log(
        "🚀 ~ file: useProdTanque.ts ~ line 109 ~ onDel ~ response",
        response
      );
      return false;
    }
  }

  async function getById(id: number) {
    try {
      const { data } = await service.getById(id);
      return data;
    } catch (err: any) {
      const response = err?.response?.data;
      console.log(
        "🚀 ~ file: useProdTanque.ts ~ line 123 ~ getById ~ response",
        response
      );
      return undefined;
    }
  }

  return {
    prodTanques,
    form,
    list,
    listByTanqueId,
    onSearch,
    onSearchByTanqueId,
    onAdd,
    onDel,
    getById,
  };
};

export { useProdTanque };
