import ContaBancaria from "../models/ContaBancaria";
import ProdutorView from "./ProdutorView";

export default {
    render(conta: ContaBancaria){
        return{
            ...this.renderClean(conta),
            Produtor: ProdutorView.renderClean(conta.Produtor)
        }
    },
    renderMany(contas: ContaBancaria[]){
        return contas.map(conta => this.render(conta));
    },
    renderClean(conta: ContaBancaria){
        return {
            ContaId: conta.ContaId,
            NomePertence: conta.NomePertence,
            Banco: conta.Banco,
            Agencia: conta.Agencia,
            Conta: conta.Conta
        };
    },
    renderManyClean(contas: ContaBancaria[]){
        return contas.map(conta => this.renderClean(conta));
    }
}