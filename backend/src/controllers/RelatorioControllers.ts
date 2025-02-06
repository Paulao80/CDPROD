import { Request, Response } from "express";
import pdf from "html-pdf";
import ejs from "ejs";
import path from "path";
import Produtor from "../models/Produtor";
import Propriedade from "../models/Propriedade";
import Tanque from "../models/Tanque";
import { getRepository } from "typeorm";
import dayjs from "dayjs";

export default {
  async gerar(request: Request, response: Response) {
    const { tipo } = request.query;

    let caminho = "";
    let data = [] as any[];
    const url = `${process.env.BASE_URL}`;

    switch (tipo) {
      case "produtor":
        const ProdutoresRepository = getRepository(Produtor);
        caminho = path.join(
          __dirname,
          "..",
          "templates",
          "reports",
          "produtor.ejs"
        );
        const produtores = await ProdutoresRepository.find();
        data = produtores.map((p) => ({
          ...p,
          DataNasc: dayjs(p.DataNasc).format("DD/MM/YYYY"),
        }));
        break;
      case "propriedade":
        const PropriedadesRepository = getRepository(Propriedade);
        caminho = path.join(
          __dirname,
          "..",
          "templates",
          "reports",
          "propriedade.ejs"
        );
        data = await PropriedadesRepository.find();
        break;
      case "tanque":
        const TanquesRepository = getRepository(Tanque);
        caminho = path.join(
          __dirname,
          "..",
          "templates",
          "reports",
          "tanque.ejs"
        );
        data = await TanquesRepository.find();
        break;
      default:
        return response
          .status(500)
          .json({ message: "Informe um tipo de Relatório correto!" });
    }

    ejs.renderFile(caminho, { data, url }, (err, html) => {
      if (err) return response.status(500).json(err);

      pdf
        .create(html, {
          format: "A4",
          orientation: tipo === "tanque" ? "landscape" : "portrait",
          childProcessOptions: {
            // @ts-ignore: Unreachable code error
            env: {
              OPENSSL_CONF: "/dev/null",
            },
          },
        })
        .toBuffer((err, buffer) => {
          if (err) return response.status(500).json(err);
          response.end(buffer);
        });
    });
  },
};
