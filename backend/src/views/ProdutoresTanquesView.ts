import ProdutorTanque from "../models/ProdutorTanque";
import ProdutorView from "./ProdutorView";
import TanqueView from "./TanqueView";

export default {
    render(prodTanque: ProdutorTanque){
        return{
            ...this.renderClean(prodTanque),
            Produtor: ProdutorView.renderClean(prodTanque.Produtor),
            Tanque: TanqueView.renderClean(prodTanque.Tanque)
        }
    },
    renderMany(prodTanques: ProdutorTanque[]){
        return prodTanques.map(prodTanque => this.render(prodTanque));
    },
    renderClean(prodTanque: ProdutorTanque){
        return {
            ProdutorTanqueId: prodTanque.ProdutorTanqueId,
            Responsavel: prodTanque.Responsavel
        };
    },
    renderManyClean(prodTanques: ProdutorTanque[]){
        return prodTanques.map(prodTanque => this.renderClean(prodTanque));
    },
    renderWithProdutor(prodTanque: ProdutorTanque){
        return{
            ...this.renderClean(prodTanque),
            Produtor: ProdutorView.renderClean(prodTanque.Produtor)
        }
    },
    renderManyWithProdutor(prodTanques: ProdutorTanque[]){
        return prodTanques.map(prodTanque => this.renderWithProdutor(prodTanque));
    },
    renderWithTanque(prodTanque: ProdutorTanque){
        return{
            ...this.renderClean(prodTanque),
            Tanque: TanqueView.renderClean(prodTanque.Tanque)
        }
    },
    renderManyWithTanque(prodTanques: ProdutorTanque[]){
        return prodTanques.map(prodTanque => this.renderWithTanque(prodTanque));
    }
}