import Propriedade from "../models/Propriedade";
import ProdutorView from "./ProdutorView";

export default {
    render(propriedade: Propriedade){
        return {
            ...this.renderClean(propriedade),
            Produtor: ProdutorView.renderClean(propriedade.Produtor)     
        };
    },
    renderMany(propriedades: Propriedade[]){
        return propriedades.map(propriedade => this.render(propriedade));
    },
    renderClean(propriedade: Propriedade){
        return {
            PropriedadeId: propriedade.PropriedadeId,
            Nirf: propriedade.Nirf,
            Nome: propriedade.Nome,
            InscEstadual: propriedade.InscEstadual,
            Endereco: propriedade.Endereco,
            Municipio: propriedade.Municipio,
            Estado: propriedade.Estado    
        };
    },
    renderManyClean(propriedades: Propriedade[]){
        return propriedades.map(propriedade => this.renderClean(propriedade));
    }
}