import { Produtor } from "./produtor";

export interface Propriedade {
  PropriedadeId?: number;
  Nirf?: string;
  Nome?: string;
  InscEstadual?: string;
  Endereco?: string;
  Municipio?: string;
  Estado?: string;
  Produtor?: Produtor;
}
