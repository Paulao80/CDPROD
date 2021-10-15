interface Action {
    type: string;
}

export const DashboardActive = () => {
    return {type: 'DASHBOARD_ACTIVE'} as Action;
}

export const ProdutoresActive = () => {
    return {type: 'PRODUTORES_ACTIVE'} as Action;
}

export const PropriedadesActive = () => {
    return {type: 'PROPRIEDADES_ACTIVE'} as Action;
}

export const TanquesActive = () => {
    return {type: 'TANQUES_ACTIVE'} as Action;
}

export const RelatoriosActive = () => {
    return {type: 'RELATORIOS_ACTIVE'} as Action;
}

export const NoneActive = () => {
    return {type: 'NONE_ACTIVE'} as Action;
}