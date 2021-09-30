import {Response} from 'express';
import {RequestWithUser} from '../interfaces';
import {getConnection} from 'typeorm';
import Tanque from '../models/Tanque';
import Produtor from '../models/Produtor';
import Propriedade from '../models/Propriedade';

export default{
    async index(request: RequestWithUser, response: Response){
        const produtores = await getConnection()
            .createQueryBuilder()
            .select('COUNT(P.ProdutorId) AS Produtores')
            .from(Produtor,"P")
            .getRawOne();

        const propriedades = await getConnection()
            .createQueryBuilder()
            .select('COUNT(P.PropriedadeId) AS Propriedades')
            .from(Propriedade,"P")
            .getRawOne();

        const tanques = await getConnection()
            .createQueryBuilder()
            .select('COUNT(T.TanqueId) AS Tanques')
            .from(Tanque,"T")
            .getRawOne();

        return response.json({...produtores, ...propriedades, ...tanques});

    }
}