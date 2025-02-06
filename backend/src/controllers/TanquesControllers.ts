import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Tanque from "../models/Tanque";
import { default as ProdutorClass } from "../models/Produtor";
import TanqueView from "../views/TanqueView";
import * as Yup from "yup";
import fs from "fs";
import path from "path";

export default {
  async index(request: Request, response: Response) {
    const { group } = request.query;

    const TanquesRepository = getRepository(Tanque);

    switch (group) {
      case "TipoTanque":
        const tipos = await TanquesRepository.createQueryBuilder("T")
          .select(["T.TipoTanque AS TipoTanque", "COUNT(T.TipoTanque) AS QTD"])
          .groupBy("T.TipoTanque")
          .getRawMany();
        return response.json(tipos);

      case undefined:
        const tanques = await TanquesRepository.find({
          relations: ["ProdutoresTanques", "ProdutoresTanques.Produtor"],
        });

        return response.json(TanqueView.renderMany(tanques));

      default:
        return response.json([]);
    }
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const TanquesRepository = getRepository(Tanque);

    const tanque = await TanquesRepository.findOneOrFail(id, {
      relations: ["ProdutoresTanques", "ProdutoresTanques.Produtor"],
    });

    return response.json(TanqueView.render(tanque));
  },
  async create(request: Request, response: Response) {
    const {
      Rota,
      Capacidade,
      MediaDiaria,
      TipoTanque,
      NumeroSerie,
      Marca,
      Latitude,
      Longitude,
      ProdutoresTanques,
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
      ProdutoresTanques,
    };

    const schema = Yup.object().shape({
      Rota: Yup.string().nullable(),
      Capacidade: Yup.number().required("Capacidade é Obrigatória"),
      MediaDiaria: Yup.number().required("Média Diária é Obrigatória"),
      TipoTanque: Yup.number().required("Tipo de Tanque é Obrigatório"),
      NumeroSerie: Yup.string().required("Número de Série é Obrigatório"),
      Marca: Yup.string().required("Marca é Obrigatória"),
      Latitude: Yup.number().required("Latitude é Obrigatória"),
      Longitude: Yup.number().required("Longitude é Obrigatória"),
      FotoPath: Yup.string().notRequired(),
      ProdutoresTanques: Yup.array(
        Yup.object().shape({
          Responsavel: Yup.boolean().required("Responsavel é Obrigatório"),
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
        })
      ).notRequired(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const TanquesRepository = getRepository(Tanque);
    const ProdutoresRepository = getRepository(ProdutorClass);

    if (
      ProdutoresTanques !== undefined &&
      ProdutoresTanques !== null &&
      ProdutoresTanques.length > 0
    ) {
      ProdutoresTanques.map(async (obj: any) => {
        obj.Responsavel = JSON.parse(obj.Responsavel);

        const produtor = await ProdutoresRepository.findOneOrFail(
          obj.Produtor.ProdutorId
        );

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

    const resposta = await TanquesRepository.findOneOrFail(tanque.TanqueId, {
      relations: ["ProdutoresTanques", "ProdutoresTanques.Produtor"],
    });

    return response.status(201).json(TanqueView.render(resposta));
  },
  async update(request: Request, response: Response) {
    const validation = request.body;

    var FotoPath = request.file?.filename;

    const schema = Yup.object().shape({
      TanqueId: Yup.number().required("TanqueId é Obrigatório"),
      Rota: Yup.string().nullable(),
      Capacidade: Yup.number().required("Capacidade é Obrigatória"),
      MediaDiaria: Yup.number().required("MediaDiaria é Obrigatória"),
      TipoTanque: Yup.number().required("TipoTanque é Obrigatório"),
      NumeroSerie: Yup.string().required("NumeroSerie é Obrigatório"),
      Marca: Yup.string().required("Marca é Obrigatória"),
      Latitude: Yup.number().required("Latitude é Obrigatória"),
      Longitude: Yup.number().required("Longitude é Obrigatória"),
      FotoPath: Yup.string().notRequired(),
      ProdutoresTanques: Yup.array(
        Yup.object().shape({
          Responsavel: Yup.boolean().required("Responsavel é Obrigatório"),
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
        })
      ).notRequired(),
    });

    await schema.validate(validation, {
      abortEarly: false,
    });

    const {
      TanqueId,
      Rota,
      Capacidade,
      MediaDiaria,
      TipoTanque,
      NumeroSerie,
      Marca,
      Latitude,
      Longitude,
    } = validation;

    const data = {
      TanqueId: parseInt(TanqueId),
      Rota,
      Capacidade: parseFloat(Capacidade),
      MediaDiaria: parseFloat(MediaDiaria),
      TipoTanque: parseInt(TipoTanque),
      NumeroSerie,
      Marca,
      Latitude: parseFloat(Latitude),
      Longitude: parseFloat(Longitude),
      FotoPath,
    };

    const TanquesRepository = getRepository(Tanque);

    let tanque = await TanquesRepository.findOne(data.TanqueId);

    if (!tanque)
      return response.status(404).json({ message: "Tanque não encontrado" });

    if (tanque !== null && tanque !== undefined) {
      if (data.FotoPath !== undefined && data.FotoPath !== null) {
        if (
          tanque.FotoPath !== undefined &&
          tanque.FotoPath !== "" &&
          tanque.FotoPath !== null
        ) {
          let pathFoto = path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            tanque.FotoPath
          );
          if (fs.existsSync(pathFoto)) fs.unlinkSync(pathFoto);
        }
      } else {
        data.FotoPath = tanque.FotoPath;
      }
    }

    tanque = TanquesRepository.create(data);

    await TanquesRepository.save(tanque);

    return response.status(200).json(TanqueView.renderClean(tanque));
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const TanquesRepository = getRepository(Tanque);

    const tanque = await TanquesRepository.findOne(id);

    if (tanque !== null && tanque !== undefined) {
      await TanquesRepository.delete(tanque.TanqueId);

      if (
        tanque.FotoPath !== undefined &&
        tanque.FotoPath !== "" &&
        tanque.FotoPath !== null
      ) {
        let pathFoto = path.join(
          __dirname,
          "..",
          "..",
          "uploads",
          tanque.FotoPath
        );
        fs.unlinkSync(pathFoto);
      }

      return response.json({
        Message: "Excluído com Sucesso!",
      });
    } else {
      return response.json({
        Message: "Tanque não encontrado!",
      });
    }
  },
};
