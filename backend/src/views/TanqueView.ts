import Tanque from "../models/Tanque";
import ProdutoresTanquesView from "./ProdutoresTanquesView";

export default {
    render(tanque: Tanque){
        return {
            ...this.renderClean(tanque),
            ProdutoresTanques: ProdutoresTanquesView.renderManyWithProdutor(tanque.ProdutoresTanques)
        };
    },
    renderMany(tanques: Tanque[]){
        return tanques.map(tanque => this.render(tanque));
    },
    renderClean(tanque: Tanque){
        return {
            TanqueId: tanque.TanqueId,
            Rota: tanque.Rota,
            Capacidade: tanque.Capacidade,
            MediaDiaria: tanque.MediaDiaria,
            TipoTanque: tanque.TipoTanque,
            FotoPath: `http://localhost:3333/uploads/${tanque.FotoPath}`,
            NumeroSerie: tanque.NumeroSerie,
            Marca: tanque.Marca,
            Latitude: tanque.Latitude,
            Longitude: tanque.Longitude
        }
    },
    renderManyClean(tanques: Tanque[]){
        return tanques.map(tanque => this.renderClean(tanque));
    }
}