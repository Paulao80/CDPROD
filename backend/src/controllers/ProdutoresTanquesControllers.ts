import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import ProdutorTanque from '../models/ProdutorTanque';
import ProdutoresTanquesView from '../views/ProdutoresTanquesView';
import * as Yup from 'yup';

export default{
    async index(request: Request, response: Response){
        const ProdutoresTanquesRepository = getRepository(ProdutorTanque);

        const produtoresTaques = await ProdutoresTanquesRepository.find({
            relations: [
                'Produtor',
                'Tanque'
            ]
        });

        return response.json(ProdutoresTanquesView.renderMany(produtoresTaques));
    },
    async show(request: Request, response: Response){
        const {id} = request.params;

        const ProdutoresTanquesRepository = getRepository(ProdutorTanque);

        const produtorTanque = await ProdutoresTanquesRepository.findOneOrFail(id, {
            relations: [
                'Produtor',
                'Tanque'
            ]
        });

        return response.json(ProdutoresTanquesView.render(produtorTanque));
    },
    async create(request: Request, response: Response){
        const {
            Responsavel,
            Produtor,
            Tanque
        } = request.body;

        const data = {
            Responsavel,
            Produtor,
            Tanque
        }

        const schema = Yup.object().shape({
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
            }).required('Produtor é Obrigatório'),
            Tanque: Yup.object().shape({
                TanqueId: Yup.number().required('TanqueId é Obrigatório'),
                Rota: Yup.string().notRequired(),
                Capacidade: Yup.number().notRequired(),
                MediaDiaria: Yup.number().notRequired(),
                TipoTanque: Yup.number().notRequired(),
                NumeroSerie: Yup.string().notRequired(),
                Marca: Yup.string().notRequired(),
                Latitude: Yup.number().notRequired(),
                Longitude: Yup.number().notRequired(),
                FotoPath: Yup.string().notRequired(),
            }).required('Tanque é Obrigatório')
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const ProdutoresTanquesRepository = getRepository(ProdutorTanque);

        const produtorTanque = ProdutoresTanquesRepository.create(data);

        await ProdutoresTanquesRepository.save(produtorTanque);

        return response.status(201).json(produtorTanque);
    }
};