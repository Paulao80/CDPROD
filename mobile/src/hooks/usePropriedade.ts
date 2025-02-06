import { useMemo, useState } from "react";
import { Propriedade } from "../interfaces";
import { RecursivePartial } from "../Types";
import * as service from "../services/PropriedadeService";

export interface FormPropriedadeType {
  setForm: (dados: RecursivePartial<Propriedade>) => void;
  formValues: RecursivePartial<Propriedade>;
  resetForm(): void;
}

interface UsePropriedade {
  propriedades: Propriedade[];
  form: FormPropriedadeType;
  list(): Promise<Propriedade[] | undefined>;
  onSearch(): Promise<void>;
  onAdd(): Promise<boolean>;
  onDel(id: number): Promise<boolean>;
  onEdit(): Promise<boolean>;
  getById(id: number): Promise<Propriedade | undefined>;
  formatFromApiToApp(produtor?: Propriedade): Propriedade | undefined;
}

const usePropriedade = (): UsePropriedade => {
  const [formValues, setFormValues] = useState<RecursivePartial<Propriedade>>(
    {}
  );
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);

  function setForm(dados: RecursivePartial<Propriedade>) {
    setFormValues((prev) => {
      return { ...prev, ...dados };
    });
  }

  function resetForm() {
    setFormValues({});
  }

  const form: FormPropriedadeType = useMemo(() => {
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
      console.log("🚀 ~ file: usePropriedade.ts ~ line 52 ~ list ~ err", err);
      return [];
    }
  }

  async function onSearch() {
    list().then((resp) => {
      if (resp) setPropriedades(resp);
    });
  }

  async function onAdd() {
    try {
      const { data } = await service.create(formatFromAppToApi(formValues));
      if (data) setPropriedades((prev) => prev.concat(data));
      return true;
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: usePropriedade.ts ~ line 70 ~ onAdd ~ response",
        response
      );
      return false;
    }
  }

  async function onEdit() {
    try {
      const { data } = await service.edit(formatFromAppToApi(formValues));
      if (data) {
        const itemIndex = propriedades.findIndex(
          (item) => item.PropriedadeId === data.PropriedadeId
        );
        const updatedListItems = [...propriedades];
        updatedListItems[itemIndex] = data;
        setPropriedades(updatedListItems);
      }

      return true;
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: usePropriedade.ts ~ line 90 ~ onEdit ~ response",
        response
      );
      return false;
    }
  }

  async function onDel(id: number) {
    try {
      const { data } = await service.del(id);
      console.log(
        "🚀 ~ file: usePropriedade.ts ~ line 98 ~ onDel ~ data",
        data
      );

      setPropriedades((prev) => {
        return prev.filter((item) => item.PropriedadeId !== id);
      });
      return true;
    } catch (err: any) {
      const response = err.response.data;
      console.log(
        "🚀 ~ file: usePropriedade.ts ~ line 106 ~ onDel ~ response",
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
        "🚀 ~ file: usePropriedade.ts ~ line 117 ~ getById ~ response",
        response
      );
      return undefined;
    }
  }

  function formatFromAppToApi(
    formValues: RecursivePartial<Propriedade>
  ): Propriedade {
    const { ...resto } = formValues;

    return {
      ...resto,
    };
  }

  function formatFromApiToApp(
    propriedade?: Propriedade
  ): Propriedade | undefined {
    if (!propriedade) return undefined;

    const { ...resto } = propriedade;

    return {
      ...resto,
    };
  }

  return {
    propriedades,
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

export { usePropriedade };
