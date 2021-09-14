import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Tanque from '../models/Tanque';
import {default as ProdutorClass} from '../models/Produtor';
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

        var FotoPath = request.file?.filename;

        const data = {
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
        }

        const schema = Yup.object().shape({
            Rota: Yup.string().nullable(),
            Capacidade: Yup.number().required('Capacidade é Obrigatória'),
            MediaDiaria: Yup.number().required('MediaDiaria é Obrigatória'),
            TipoTanque: Yup.number().required('TipoTanque é Obrigatório'),
            NumeroSerie: Yup.string().required('NumeroSerie é Obrigatório'),
            Marca: Yup.string().required('Marca é Obrigatória'),
            Latitude: Yup.number().required('Latitude é Obrigatória'),
            Longitude: Yup.number().required('Longitude é Obrigatória'),
            FotoPath: Yup.string().notRequired(),
            ProdutoresTanques: Yup.array(
                Yup.object().shape({
                    Responsavel: Yup.boolean().required('Responsavel é Obrigatório'),
                    Produtor: Yup.object().shape({
                        ProdutorId: Yup.number().required('ProdutorId é Obrigatório'),
                        Nome: Yup.string().notRequired(),
                        DataNasc: Yup.date().notRequired(),
                        TipoPessoa: Yup.number().notRequired(),
                        Nacionalidade: Yup.string().notRequired(),
                        CpfCnpj: Yup.string().notRequired(),
                        RG: Yup.string().notRequired(),
                        OrgaoExp: Yup.string().notRequired(),
                        EstadoExp: Yup.string().notRequired(),
                        DataExp: Yup.date().notRequired(),
                        EstadoCivil: Yup.number().notRequired(),
                        Telefone: Yup.string().notRequired(),
                        UltLaticinio: Yup.string().notRequired()
                    }).required('Produtor é Obrigatório')
                })
            ).notRequired()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const TanquesRepository = getRepository(Tanque);
        const ProdutoresRepository = getRepository(ProdutorClass);

        if(ProdutoresTanques !== undefined && ProdutoresTanques !== null && ProdutoresTanques.length > 0){
            ProdutoresTanques.map(async (obj: any) => {
                obj.Responsavel = JSON.parse(obj.Responsavel);

                const produtor = await ProdutoresRepository.findOneOrFail(obj.Produtor.ProdutorId); 

                obj.Produtor.Nome = produtor.Nome;
                obj.Produtor.DataNasc = produtor.DataNasc;
                obj.Produtor.TipoPessoa = produtor.TipoPessoa;
                obj.Produtor.Nacionalidade = produtor.Nacionalidade;
                obj.Produtor.CpfCnpj = produtor.CpfCnpj;
                obj.Produtor.RG = produtor.RG;
                obj.Produtor.OrgaoExp = produtor.OrgaoExp;
                obj.Produtor.EstadoExp = produtor.EstadoExp;
                obj.Produtor.DataExp = produtor.DataExp;
                obj.Produtor.EstadoCivil = produtor.EstadoCivil;
                obj.Produtor.Telefone = produtor.Telefone; 
                obj.Produtor.UltLaticinio = produtor.UltLaticinio;

                return obj;
            });
        }

        const tanque = TanquesRepository.create(data);

        await TanquesRepository.save(tanque);

        return response.status(201).json(tanque);
    }
}