export function formatTipoTanque(tipoTanque?: number) {
    if(tipoTanque === 1) return 'Individual';

    if(tipoTanque === 2) return 'Comunitário';

    return '';
}