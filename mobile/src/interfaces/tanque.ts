import { ImageType } from "../Types";
import { ProdutoresTanques } from "./produtoresTanques";

export interface Tanque {
    TanqueId?: number;
    Rota?: string;
    Capacidade?: number;
    MediaDiaria?: number;
    TipoTanque?: number;
    FotoPath?: string;
    NumeroSerie?: string;
    Marca?: string;
    Latitude?: number;
    Longitude?: number;
    ProdutoresTanques?: ProdutoresTanques[];
    image?: ImageType[];
  }