import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Propriedade from '../models/Propriedade';
import Produtor from '../models/Produtor';
import PropriedadeView from '../views/PropriedadeView';

export default {
    async index(request: Request, response: Response){
        const PropriedadesRepository = getRepository(Propriedade);

        const propriedades = await PropriedadesRepository.find({
            relations: [
                'Produtor'
            ]
        });

        return response.json(PropriedadeView.renderMany(propriedades));
    },
    async show(request: Request, response: Response){
        const {id} = request.params;

        const PropriedadesRepository = getRepository(Propriedade);

        const propriedade = await PropriedadesRepository.findOneOrFail(id, {
            relations: [
                'Produtor'
            ]
        });

        return response.json(PropriedadeView.render(propriedade));
    },
    async create(request: Request, response: Response){
        const {
            Nirf,
            Nome,
            InscEstadual,
            Endereco,
            Municipio,
            Estado,
            ProdutorId
        } = request.body;

        const ProdutoresRepository = getRepository(Produtor);

        const produtor = await ProdutoresRepository.findOneOrFail(ProdutorId);

        const PropriedadesRepository = getRepository(Propriedade);

        const propriedade = PropriedadesRepository.create({
            Nirf,
            Nome,
            InscEstadual,
            Endereco,
            Municipio,
            Estado,
            Produtor: produtor
        });

        await PropriedadesRepository.save(propriedade);

        return response.status(201).json(propriedade);
    }
}