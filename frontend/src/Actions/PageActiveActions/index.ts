import { UnknownAction } from "redux";


export const DashboardActive = () => {
    return {type: 'DASHBOARD_ACTIVE'} as UnknownAction;
}

export const ProdutoresActive = () => {
    return {type: 'PRODUTORES_ACTIVE'} as UnknownAction;
}

export const PropriedadesActive = () => {
    return {type: 'PROPRIEDADES_ACTIVE'} as UnknownAction;
}

export const TanquesActive = () => {
    return {type: 'TANQUES_ACTIVE'} as UnknownAction;
}

export const RelatoriosActive = () => {
    return {type: 'RELATORIOS_ACTIVE'} as UnknownAction;
}

export const NoneActive = () => {
    return {type: 'NONE_ACTIVE'} as UnknownAction;
}