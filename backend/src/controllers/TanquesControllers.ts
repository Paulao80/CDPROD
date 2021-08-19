import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Tanque from '../models/Tanque';
import TanqueView from '../views/TanqueView';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response){
        const TanquesRepository = getRepository(Tanque);

        const tanques = await TanquesRepository.find({
            relations: [
                'ProdutoresTanques',
                'ProdutoresTanques.Produtor'     
            ]
        });

        return response.json(TanqueView.renderMany(tanques));
    },
    async show(request: Request, response: Response){
        const {id} = request.params;

        const TanquesRepository = getRepository(Tanque);
        
        const tanque = await TanquesRepository.findOneOrFail(id,{
            relations: [
                'ProdutoresTanques',
                'ProdutoresTanques.Produtor'       
            ]
        });

        return response.json(TanqueView.render(tanque));
    },
    async create(request: Request, response: Response){
        console.log(request.file);

        const {
            Rota,
            Capacidade,
            MediaDiaria,
            TipoTanque,            
            NumeroSerie,
            Marca,
            Latitude,
            Longitude,
            ProdutoresTanques
        } = request.body;

        if(ProdutoresTanques !== undefined && ProdutoresTanques !== null && ProdutoresTanques.length > 0){
            ProdutoresTanques.map((obj: any) => {
                obj.Responsavel = JSON.parse(obj.Responsavel);
                return obj;
            });
        }

        var FotoPath = request.file?.filename;

        const TanquesRepository = getRepository(Tanque);

        const tanque = TanquesRepository.create({
            Rota,
            Capacidade,
            MediaDiaria,
            TipoTanque,            
            NumeroSerie,
            Marca,
            Latitude,
            Longitude,
            FotoPath,
            ProdutoresTanques
        });

        await TanquesRepository.save(tanque);

        return response.status(201).json(tanque);
    }
}