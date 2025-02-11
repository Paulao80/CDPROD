import { Data } from "../Types";

export interface Produtor {
  ProdutorId?: number;
  Nome?: string;
  DataNasc?: Data;
  TipoPessoa?: number;
  Nacionalidade?: string;
  CpfCnpj?: string;
  RG?: string;
  OrgaoExp?: string;
  EstadoExp?: string;
  DataExp?: Data;
  EstadoCivil?: number;
  Telefone?: string;
  UltLaticinio?: string;
  ContasBancarias?: ContasBancarias[];
}

export interface ContasBancarias {
  ContaId?: number;
  NomePertence?: string;
  Banco?: string;
  Agencia?: string;
  Conta?: string;
  Produtor?: Produtor;
  PertenceProdutor?: boolean;
}

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
  image?: File[];
}

export interface ProdutorTanque {
  ProdutorTanqueId?: number;
  Responsavel?: boolean | number;
  Produtor?: Produtor;
  Tanque?: Tanque;
}

export interface ProdutoresTanques {
  ProdutorTanqueId: number;
  Responsavel: boolean;
  Produtor: Produtor;
}

export interface Uf {
  id: number;
  sigla: string;
  nome: string;
}

export interface RowsDeleted {
  data: {
    index: number;
    dataIndex: number;
  }[];
}

export interface SeriesData {
  name: string;
  data: number[];
}

export interface ChartData {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
}

export interface StateMenu {
  aside: string;
  button: string;
}

export interface StatePageActive {
  Dashboard: string;
  Produtores: string;
  Propriedades: string;
  Tanques: string;
  Relatorios: string;
}

export enum OperationModal {
  Add,
  Edit,
  Info,
}

export interface TypeModal {
  key: string;
  title: string;
  operation: OperationModal;
}

export interface StateModal {
  modals: TypeModal[];
}

export interface User {
  UserId: number;
  Name: string;
  User: string;
  Email: string;
  FotoPath: string;
  AccessToken: string;
}

export interface Delete {
  Message: string;
}

export interface Error<T> {
  message: string;
  errors?: T;
}

export interface ApiResponse<T> {
  data?: T;
  status: number;
}

export interface Reducers {
  MenuReducer: StateMenu;
  PageActiveReducer: StatePageActive;
  ModalStateReducer: StateModal;
}

export * from "./errors";
