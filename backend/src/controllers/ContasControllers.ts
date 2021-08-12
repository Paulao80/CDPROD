import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import ContaBancaria from '../models/ContaBancaria';
import Produtor from '../models/Produtor';

export default {
    async index(request: Request, response: Response){
        const ContaRepository = getRepository(ContaBancaria);

        const contas = await ContaRepository.find();

        return response.json(contas);
    },
    async show(request: Request, response: Response){
        const {id} = request.params;

        const ContaRepository = getRepository(ContaBancaria);

        const conta = await ContaRepository.findOneOrFail(id);

        return response.json(conta);
    },
    async create(request: Request, response: Response){
        const {
            NomePertence,
            Banco,
            Agencia,
            Conta,
            ProdutorId
        } = request.body;

        const ProdutoresRepository = getRepository(Produtor);

        const produtor = await ProdutoresRepository.findOneOrFail(ProdutorId);

        const ContaRepository = getRepository(ContaBancaria);

        const conta = ContaRepository.create({
            NomePertence,
            Banco,
            Agencia,
            Conta,
            Produtor: produtor
        });
        
        await ContaRepository.save(conta);

        return response.status(201).json(conta);
    }
}