import { Response} from 'express';
import {RequestWithUser} from '../interfaces';
import {getRepository} from 'typeorm';
import Produtor from '../models/Produtor';
import ProdutorView from '../views/ProdutorView';
import * as Yup from 'yup';

export default {

    async index(request: RequestWithUser, response: Response){
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
    async show(request: RequestWithUser, response: Response){
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
    async create(request: RequestWithUser, response: Response){
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
            Propriedades
        } = request.body; 

        const ProdutoresRepository = getRepository(Produtor);

        const data = {
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
            Propriedades          
        }
        
        const schema = Yup.object().shape({
            Nome: Yup.string().required('Nome é Obrigatório'),
            DataNasc: Yup.date().required('Data de Nascimento é Obrigatório'),
            TipoPessoa: Yup.number().required('Tipo de Pessoa é Obrigatório'),
            Nacionalidade: Yup.string().required('Nacionalidade é Obrigatória'),
            CpfCnpj: Yup.string().required('CPF/CNPJ é Obrigatório'),
            RG: Yup.string().required('RG é Obrigatório'),
            OrgaoExp: Yup.string().required('Orgão de Expedição é Obrigatório'),
            EstadoExp: Yup.string().required('Estado de Expedição é Obrigatório'),
            DataExp: Yup.date().required('Data de Expedição é Obrigatório'),
            EstadoCivil: Yup.number().required('Estado Civil  é Obrigatório'),
            Telefone: Yup.string().nullable(),
            UltLaticinio: Yup.string().nullable(),
            ContasBancarias: Yup.array(
                Yup.object().shape({
                    NomePertence: Yup.string().required(),
                    Banco: Yup.string().required(),
                    Agencia: Yup.string().required(),
                    Conta: Yup.string().required()
                })
            ).notRequired(),
            Propriedades: Yup.array(
                Yup.object().shape({
                    Nirf: Yup.string().required(),
                    Nome: Yup.string().required(),
                    InscEstadual: Yup.string().required(),
                    Endereco: Yup.string().required(),
                    Municipio: Yup.string().required(),
                    Estado: Yup.string().required()
                })
            ).notRequired()

        });

        await schema.validate(data, {
            abortEarly: false
        });

        const produtor = ProdutoresRepository.create(data);
    
        await ProdutoresRepository.save(produtor);
    
        return response.status(201).json(produtor);
    },
    async update(request: RequestWithUser, response: Response){
        const {
            ProdutorId,
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
            UltLaticinio
        } = request.body; 

        const ProdutoresRepository = getRepository(Produtor);

        const data = {
            ProdutorId,
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
            UltLaticinio        
        }
        
        const schema = Yup.object().shape({
            ProdutorId: Yup.number().required('Id do Produtor é Obrigatório'),
            Nome: Yup.string().required('Nome é Obrigatório'),
            DataNasc: Yup.date().required('Data de Nascimento é Obrigatório'),
            TipoPessoa: Yup.number().required('Tipo de Pessoa é Obrigatório'),
            Nacionalidade: Yup.string().required('Nacionalidade é Obrigatória'),
            CpfCnpj: Yup.string().required('CPF/CNPJ é Obrigatório'),
            RG: Yup.string().required('RG é Obrigatório'),
            OrgaoExp: Yup.string().required('Orgão de Expedição é Obrigatório'),
            EstadoExp: Yup.string().required('Estado de Expedição é Obrigatório'),
            DataExp: Yup.date().required('Data de Expedição é Obrigatório'),
            EstadoCivil: Yup.number().required('Estado Civil  é Obrigatório'),
            Telefone: Yup.string().nullable(),
            UltLaticinio: Yup.string().nullable()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const find = await ProdutoresRepository.findOne(ProdutorId);

        if(!find) return response.status(404).json({message: "Produtor não encontrado"});

        const produtor = ProdutoresRepository.create(data);
    
        await ProdutoresRepository.save(produtor);
    
        return response.status(200).json(produtor);
    },
    async delete(request: RequestWithUser, response: Response){
        const {id} = request.params;

        const ProdutoresRepository = getRepository(Produtor);    

        const produtor = await ProdutoresRepository.findOne(id);

        if(produtor !== null && produtor !== undefined){
            await ProdutoresRepository.delete(produtor.ProdutorId)
            return response.json({
                Message: "Excluído com Sucesso!"
            });
        }
        else{
            return response.json({
                Message: "Produtor não encontrado!"
            });
        }     
    }
}