import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Propriedade from "../models/Propriedade";
import { default as ProdutorClass } from "../models/Produtor";
import PropriedadeView from "../views/PropriedadeView";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const { group } = request.query;

    const PropriedadesRepository = getRepository(Propriedade);

    switch (group) {
      case "Municipio":
        const municipios = await PropriedadesRepository.createQueryBuilder("P")
          .select(["P.Municipio AS Municipio", "COUNT(P.Municipio) AS QTD"])
          .groupBy("P.Municipio")
          .getRawMany();
        return response.json(municipios);
      case undefined:
        const propriedades = await PropriedadesRepository.find({
          relations: ["Produtor"],
        });

        return response.json(PropriedadeView.renderMany(propriedades));
      default:
        return response.json([]);
    }
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const PropriedadesRepository = getRepository(Propriedade);

    const propriedade = await PropriedadesRepository.findOneOrFail(id, {
      relations: ["Produtor"],
    });

    return response.json(PropriedadeView.render(propriedade));
  },
  async create(request: Request, response: Response) {
    const { Nirf, Nome, InscEstadual, Endereco, Municipio, Estado, Produtor } =
      request.body;

    const data = {
      Nirf,
      Nome,
      InscEstadual,
      Endereco,
      Municipio,
      Estado,
      Produtor,
    };

    const schema = Yup.object().shape({
      Nirf: Yup.string().required("NIRF é Obrigatório"),
      Nome: Yup.string().required("Nome é Obrigatório"),
      InscEstadual: Yup.string().required("Inscrição Estadual é Obrigatória"),
      Endereco: Yup.string().required("Endereço é Obrigatório"),
      Municipio: Yup.string().required("Município é Obrigatório"),
      Estado: Yup.string().required("Estado é Obrigatório"),
      Produtor: Yup.object()
        .shape({
          ProdutorId: Yup.number().required("Produtor é Obrigatório"),
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

    const ProdutoresRepository = getRepository(ProdutorClass);
    const PropriedadesRepository = getRepository(Propriedade);

    const produtor = await ProdutoresRepository.findOneOrFail(
      Produtor.ProdutorId
    );

    data.Produtor = produtor;

    const propriedade = PropriedadesRepository.create(data);

    await PropriedadesRepository.save(propriedade);

    return response.status(201).json(propriedade);
  },
  async update(request: Request, response: Response) {
    const {
      PropriedadeId,
      Nirf,
      Nome,
      InscEstadual,
      Endereco,
      Municipio,
      Estado,
      Produtor,
    } = request.body;

    const data = {
      PropriedadeId,
      Nirf,
      Nome,
      InscEstadual,
      Endereco,
      Municipio,
      Estado,
      Produtor,
    };

    const schema = Yup.object().shape({
      PropriedadeId: Yup.number().required("PropriedadeId é Obrigatório"),
      Nirf: Yup.string().required("Nirf é Obrigatório"),
      Nome: Yup.string().required("Nome é Obrigatório"),
      InscEstadual: Yup.string().required("InscEstadual é Obrigatório"),
      Endereco: Yup.string().required("Endereco é Obrigatório"),
      Municipio: Yup.string().required("Municipio é Obrigatório"),
      Estado: Yup.string().required("Estado é Obrigatório"),
      Produtor: Yup.object()
        .shape({
          ProdutorId: Yup.number().required("Produtor é Obrigatório"),
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

    const ProdutoresRepository = getRepository(ProdutorClass);
    const PropriedadesRepository = getRepository(Propriedade);

    const find = await PropriedadesRepository.findOne(PropriedadeId);

    if (!find)
      return response
        .status(404)
        .json({ message: "Propriedade não encontrada" });

    const produtor = await ProdutoresRepository.findOneOrFail(
      Produtor.ProdutorId
    );

    data.Produtor = produtor;

    const propriedade = PropriedadesRepository.create(data);

    await PropriedadesRepository.save(propriedade);

    return response.status(200).json(propriedade);
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const PropriedadesRepository = getRepository(Propriedade);

    const propriedade = await PropriedadesRepository.findOne(id);

    if (propriedade !== null && propriedade !== undefined) {
      await PropriedadesRepository.delete(propriedade.PropriedadeId);
      return response.json({
        Message: "Excluído com Sucesso!",
      });
    } else {
      return response.json({
        Message: "Propriedade não encontrada!",
      });
    }
  },
};
