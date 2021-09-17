export interface Produtor {
    ProdutorId: number;
    Nome: string;
    DataNasc: string;
    TipoPessoa: number;
    Nacionalidade: string;
    CpfCnpj: string;
    RG: string;
    OrgaoExp: string;
    EstadoExp: string;
    DataExp: string;
    EstadoCivil: number;
    Telefone: string;
    UltLaticinio: string;
}

export interface Propriedade {
    PropriedadeId: number;
    Nirf: string;
    Nome: string;
    InscEstadual: string;
    Endereco: string;
    Municipio: string;
    Estado: string;
    Produtor: Produtor;
}

export interface Uf {
    id: number;
    sigla: string;
    nome: string;
}

export interface RowsDeleted {
    data: {
        index: number,
        dataIndex: number
    }[];
}