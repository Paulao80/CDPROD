import {StatePageActive} from '../../Interfaces';

interface Action {
    type: string;
}

const PageActive = (state: StatePageActive = {
    Dashboard: '',
    Produtores: '',
    Propriedades: '',
    Tanques: '',
    Relatorios: ''
}, action: Action) => {

    switch (action.type) {
        case 'DASHBOARD_ACTIVE':
            state.Dashboard = 'active';
            state.Produtores = '';
            state.Propriedades = '';
            state.Tanques = '';
            state.Relatorios = '';
            return state;
        case 'PRODUTORES_ACTIVE':
            state.Dashboard = '';
            state.Produtores = 'active';
            state.Propriedades = '';
            state.Tanques = '';
            state.Relatorios = '';
            return state;
        case 'PROPRIEDADES_ACTIVE':
            state.Dashboard = '';
            state.Produtores = '';
            state.Propriedades = 'active';
            state.Tanques = '';
            state.Relatorios = '';
            return state;
        case 'TANQUES_ACTIVE':
            state.Dashboard = '';
            state.Produtores = '';
            state.Propriedades = '';
            state.Tanques = 'active';
            state.Relatorios = '';
            return state;
        case 'RELATORIOS_ACTIVE':
            state.Dashboard = '';
            state.Produtores = '';
            state.Propriedades = '';
            state.Tanques = '';
            state.Relatorios = 'active';
            return state;
        case 'NONE_ACTIVE':
            state.Dashboard = '';
            state.Produtores = '';
            state.Propriedades = '';
            state.Tanques = '';
            state.Relatorios = '';
            return state;
        default: return state;
    }
}

export default PageActive;