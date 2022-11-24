import { useMemo, useState, useEffect } from "react";
import { ContaBancaria } from "../interfaces";
import { RecursivePartial } from "../Types";
import * as service from "../services/ContaService";

export interface FormContaType {
  setForm: (dados: RecursivePartial<ContaBancaria>) => void;
  formValues: RecursivePartial<ContaBancaria>;
  resetForm(): void;
}

interface UseContaBancaria {
  contas: ContaBancaria[];
  form: FormContaType;
  list(): Promise<ContaBancaria[] | undefined>;
  listByProdutorId(id: number): Promise<ContaBancaria[] | undefined>;
  onSearch(): Promise<void>;
  onSearchByProdutoId(id: number): Promise<void>;
  onAdd(): Promise<boolean>;
  onDel(id: number): Promise<boolean>;
  onEdit(): Promise<boolean>;
  getById(id: number): Promise<ContaBancaria | undefined>;
}

const useContaBancaria = (): UseContaBancaria => {
  const [formValues, setFormValues] = useState<RecursivePartial<ContaBancaria>>(
    {}
  );

  const [contas, setContas] = useState<ContaBancaria[]>([]);

  function setForm(dados: RecursivePartial<ContaBancaria>) {
    setFormValues((prev) => {
      return { ...prev, ...dados };
    });
  }

  function resetForm() {
    setFormValues({});
  }

  const form: FormContaType = useMemo(() => {
    return {
      setForm,
      formValues,
      resetForm,
    };
  }, [formValues]);

  useEffect(() => {
    if (formValues.PertenceProdutor) {
      setForm({ NomePertence: formValues.Produtor?.Nome });
      return;
    }

    setForm({ NomePertence: "" });
  }, [formValues.PertenceProdutor]);

  async function list() {
    try {
      const { data } = await service.list();
      return data;
    } catch (err) {
      console.log("🚀 ~ file: useContaBancaria.ts ~ line 54 ~ list ~ err", err);
      return [];
    }
  }

  async function listByProdutorId(id: number) {
    try {
      const { data } = await service.listByProdutorId(id);
      return data;
    } catch (err) {
      console.log(
        "🚀 ~ file: useContaBancaria.ts ~ line 64 ~ listByProdutorId ~ err",
        err
      );
      return [];
    }
  }

  async function onSearch() {
    list().then((resp) => {
      if (resp) setContas(resp);
    });
  }

  async function onSearchByProdutoId(id: number) {
    listByProdutorId(id).then((resp) => {
      if (resp) setContas(resp);
    });
  }

  async function onAdd() {
    try {
      const { data } = await service.create(formatFromAppToApi(formValues));
      if (data) setContas((prev) => prev.concat(data));
      return true;
    } catch (err: any) {
      const response = err?.response?.data;
      console.log(
        "🚀 ~ file: useContaBancaria.ts ~ line 72 ~ onAdd ~ response",
        response
      );
      return false;
    }
  }

  async function onEdit() {
    try {
      const { data } = await service.edit(formatFromAppToApi(formValues));
      if (data) {
        const itemIndex = contas.findIndex(
          (item) => item.ContaId === data.ContaId
        );
        const updatedListItems = [...contas];
        updatedListItems[itemIndex] = data;
        setContas(updatedListItems);
      }

      return true;
    } catch (err: any) {
      const response = err?.response?.data;
      console.log(
        "🚀 ~ file: useContaBancaria.ts ~ line 115 ~ onEdit ~ response",
        response
      );
      return false;
    }
  }

  async function onDel(id: number) {
    try {
      await service.del(id);

      setContas((prev) => {
        return prev.filter((item) => item.ContaId !== id);
      });
      return true;
    } catch (err: any) {
      const response = err?.response?.data;
      console.log(
        "🚀 ~ file: useContaBancaria.ts ~ line 133 ~ onDel ~ response",
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
        "🚀 ~ file: useContaBancaria.ts ~ line 147 ~ getById ~ response",
        response
      );
      return undefined;
    }
  }

  function formatFromAppToApi(
    formValues: RecursivePartial<ContaBancaria>
  ): ContaBancaria {
    const { Produtor, ...resto } = formValues;
    return {
      ...resto,
      Produtor: {
        ProdutorId: Produtor?.ProdutorId,
      },
    };
  }

  return {
    contas,
    form,
    list,
    listByProdutorId,
    onSearch,
    onSearchByProdutoId,
    onAdd,
    onDel,
    onEdit,
    getById,
  };
};

export { useContaBancaria };
