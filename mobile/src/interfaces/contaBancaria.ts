import { Produtor } from "./produtor";

export interface ContaBancaria {
  ContaId?: number;
  NomePertence?: string;
  Banco?: string;
  Agencia?: string;
  Conta?: string;
  Produtor?: Produtor;
  PertenceProdutor?: boolean;
}
