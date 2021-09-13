export const GetTipoPessoa = (tipo: number) => {
    switch(tipo){
        case 1:
            return "Física";
        case 2:
            return "Jurídica"
        default:
            return "Erro";
    }
}

export const GetEstadoCivil = (estado: number) => {
    switch(estado){
        case 1:
            return "Solteiro(a)";
        case 2:
            return "Casado(a)";
        case 3:
            return "Separado(a)";
        case 4:
            return "Divorciado(a)";
        case 5:
            return "Viúvo(a)"
        default:
            return "Erro";
    }
}

export const GetTipoTanque = (tipo: number) => {
    switch (tipo) {
        case 1: 
            return "Individual";
        case 2: 
            return "Comunitário";
        default: 
            return "Erro";
    }
}