import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ContaBancaria from "../models/ContaBancaria";
import { default as ProdutorClass } from "../models/Produtor";
import ContaBancariaView from "../views/ContaBancariaView";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const ContaRepository = getRepository(ContaBancaria);

    const contas = await ContaRepository.find({
      relations: ["Produtor"],
    });

    return response.json(ContaBancariaView.renderMany(contas));
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const ContaRepository = getRepository(ContaBancaria);

    const conta = await ContaRepository.findOneOrFail(id, {
      relations: ["Produtor"],
    });

    return response.json(ContaBancariaView.render(conta));
  },
  async getByProdutorId(request: Request, response: Response) {
    const { id } = request.params;

    const ContaRepository = getRepository(ContaBancaria);

    const contas = await ContaRepository.find({
      relations: ["Produtor"],
      where: {
        Produtor: {
          ProdutorId: id,
        },
      },
    });

    return response.json(ContaBancariaView.renderMany(contas));
  },
  async create(request: Request, response: Response) {
    const { NomePertence, Banco, Agencia, Conta, Produtor } = request.body;

    const ProdutoresRepository = getRepository(ProdutorClass);
    const ContaRepository = getRepository(ContaBancaria);

    const data = {
      NomePertence,
      Banco,
      Agencia,
      Conta,
      Produtor,
    };

    const schema = Yup.object().shape({
      NomePertence: Yup.string().required("NomePertence é Obrigatório"),
      Banco: Yup.string().required("Banco é Obrigatório"),
      Agencia: Yup.string().required("Agencia é Obrigatória"),
      Conta: Yup.string().required("Conta é Obrigatória"),
      Produtor: Yup.object()
        .shape({
          ProdutorId: Yup.number().required("ProdutorId é Obrigatório"),
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
          UltLaticinio: Yup.string().notRequired(),
        })
        .required("Produtor é Obrigatório"),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const produtor = await ProdutoresRepository.findOneOrFail(
      Produtor.ProdutorId
    );

    data.Produtor = produtor;

    const conta = ContaRepository.create(data);

    await ContaRepository.save(conta);

    return response.status(201).json(conta);
  },
  async update(request: Request, response: Response) {
    const { ContaId, NomePertence, Banco, Agencia, Conta } = request.body;

    const ContaRepository = getRepository(ContaBancaria);

    const data = {
      ContaId,
      NomePertence,
      Banco,
      Agencia,
      Conta,
    };

    const schema = Yup.object().shape({
      ContaId: Yup.number().required("ContaId é Obrigatório"),
      NomePertence: Yup.string().required("NomePertence é Obrigatório"),
      Banco: Yup.string().required("Banco é Obrigatório"),
      Agencia: Yup.string().required("Agencia é Obrigatória"),
      Conta: Yup.string().required("Conta é Obrigatória"),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const conta = ContaRepository.create(data);

    await ContaRepository.save(conta);

    return response.status(200).json(conta);
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const ContaRepository = getRepository(ContaBancaria);

    const conta = await ContaRepository.findOne(id);

    if (conta !== null && conta !== undefined) {
      await ContaRepository.delete(conta.ContaId);
      return response.json({
        Message: "Excluída com Sucesso!",
      });
    } else {
      return response.json({
        Message: "Conta Bancaria não encontrada!",
      });
    }
  },
};
