import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Tanque from '../models/Tanque';

export default {
    async index(request: Request, response: Response){
        const TanquesRepository = getRepository(Tanque);

        const tanques = await TanquesRepository.find();

        return response.json(tanques);
    },
    async show(request: Request, response: Response){
        const {id} = request.params;

        const TanquesRepository = getRepository(Tanque);
        
        const tanque = await TanquesRepository.findOneOrFail(id);

        return response.json(tanque);
    },
    async create(request: Request, response: Response){
        const {
            Rota,
            Capacidade,
            MediaDiaria,
            TipoTanque,
            FotoPath,
            NumeroSerie,
            Marca,
            Latitude,
            Longitude,
            ProdutoresTanques
        } = request.body;

        const TanquesRepository = getRepository(Tanque);

        const tanque = TanquesRepository.create({
            Rota,
            Capacidade,
            MediaDiaria,
            TipoTanque,
            FotoPath,
            NumeroSerie,
            Marca,
            Latitude,
            Longitude,
            ProdutoresTanques
        });

        await TanquesRepository.save(tanque);

        return response.status(201).json(tanque);
    }
}