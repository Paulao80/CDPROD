import { Produtor } from "./produtor";
import { Tanque } from "./tanque";

export interface ProdutoresTanques {
  ProdutorTanqueId?: number;
  Responsavel?: boolean;
  Produtor?: Produtor;
  Tanque?: Tanque;
}
