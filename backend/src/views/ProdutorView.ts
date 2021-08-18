import Produtor from "../models/Produtor";
import ContaBancariaView from "./ContaBancariaView";
import PropriedadeView from "./PropriedadeView";
import ProdutoresTanquesView from "./ProdutoresTanquesView";

export default {
    render(produtor: Produtor){
        return {
            ...this.renderClean(produtor),
            ContasBancarias: ContaBancariaView.renderManyClean(produtor.ContasBancarias),
            Propriedades: PropriedadeView.renderManyClean(produtor.Propriedades),
            ProdutoresTanques: ProdutoresTanquesView.renderManyWithTanque(produtor.ProdutoresTanques)
        };
    },
    renderMany(produtores: Produtor[]){
        return produtores.map(produtor => this.render(produtor));
    },
    renderClean(produtor: Produtor){       
        return {
            ProdutorId: produtor.ProdutorId,
            Nome: produtor.Nome,
            DataNasc: produtor.DataNasc,
            TipoPessoa: produtor.TipoPessoa,
            Nacionalidade: produtor.Nacionalidade,
            CpfCnpj: produtor.CpfCnpj,
            RG: produtor.RG,
            OrgaoExp: produtor.OrgaoExp,
            EstadoExp: produtor.EstadoExp,
            DataExp: produtor.DataExp,
            EstadoCivil: produtor.EstadoCivil,
            Telefone: produtor.Telefone,
            UltLaticinio: produtor.UltLaticinio
        };
    }
}