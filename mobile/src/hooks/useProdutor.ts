import { useMemo, useState } from "react";
import { Produtor } from "../interfaces";
import { RecursivePartial } from "../Types";

interface UseProdutor {
  form: FormType;
}

interface FormType {
  setForm: (dados: RecursivePartial<Produtor>) => void;
  FormValues: RecursivePartial<Produtor>;
}

const useProdutor = (): UseProdutor => {
  const [FormValues, setFormValues] = useState<RecursivePartial<Produtor>>({});

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

  return {
    form,
  };
};

export { useProdutor };
