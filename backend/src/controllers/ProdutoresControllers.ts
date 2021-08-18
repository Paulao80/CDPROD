import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Produtor from '../models/Produtor';
import ProdutorView from '../views/ProdutorView';

export default {

    async index(request: Request, response: Response){
        const ProdutoresRepository = getRepository(Produtor);

        const produtores = await ProdutoresRepository.find({
            relations: [
                'ContasBancarias',
                'Propriedades',
                'ProdutoresTanques',
                'ProdutoresTanques.Tanque'    
            ]
        });

        return response.json(ProdutorView.renderMany(produtores));
    },
    async show(request: Request, response: Response){
        const {id} = request.params;

        const ProdutoresRepository = getRepository(Produtor);

        const produtor = await ProdutoresRepository.findOneOrFail(id, {
            relations: [
                'ContasBancarias',
                'Propriedades',
                'ProdutoresTanques',
                'ProdutoresTanques.Tanque'    
            ]
        });

        return response.json(ProdutorView.render(produtor));
    },
    async create(request: Request, response: Response){
        const {
            Nome,
            DataNasc,
            TipoPessoa,
            Nacionalidade,
            CpfCnpj,
            RG,
            OrgaoExp,
            EstadoExp,
            DataExp,
            EstadoCivil,
            Telefone,
            UltLaticinio,
            ContasBancarias,
            Propriedades,
            ProdutoresTanques
        } = request.body; 

        const ProdutoresRepository = getRepository(Produtor);

        const produtor = ProdutoresRepository.create({
            Nome,
            DataNasc,
            TipoPessoa,
            Nacionalidade,
            CpfCnpj,
            RG,
            OrgaoExp,
            EstadoExp,
            DataExp,
            EstadoCivil,
            Telefone,
            UltLaticinio,
            ContasBancarias,
            Propriedades,
            ProdutoresTanques          
        });
    
        await ProdutoresRepository.save(produtor);
    
        return response.status(201).json(produtor);
    }
}