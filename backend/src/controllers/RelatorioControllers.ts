import {Request, Response} from 'express';
import pdf from 'html-pdf';
import ejs from 'ejs';
import path from "path";
import Produtor from '../models/Produtor';
import Propriedade from '../models/Propriedade';
import Tanque from '../models/Tanque';
import {getRepository} from 'typeorm';

export default {
    async gerar(request: Request, response: Response){
        const {tipo} = request.query;

        let caminho = "";
        let data = [] as any[];

        switch(tipo){
            case "produtor":
                const ProdutoresRepository = await getRepository(Produtor);
                caminho = path.join(__dirname, '..', 'templates', 'reports', 'produtor.ejs');
                data = await ProdutoresRepository.find();
                break;
            case "propriedade":
                const PropriedadesRepository = await getRepository(Propriedade);
                caminho = path.join(__dirname, '..', 'templates', 'reports', 'propriedade.ejs');
                data = await PropriedadesRepository.find();
                break;
            case "tanque":
                const TanquesRepository = await getRepository(Tanque);
                caminho = path.join(__dirname, '..', 'templates', 'reports', 'tanque.ejs');
                data = await TanquesRepository.find();
                break;
            default: return response.status(500).json({message: "Informe um tipo de Relatório correto!"})
        }

        ejs.renderFile(caminho, {data}, (err, html) => {
            if(err) return response.status(500).json(err);

            pdf.create(html,{
                format: "A4",
                orientation: "portrait"
            }).toBuffer((err, buffer) => {
                if(err) return response.status(500).json(err);        
                response.end(buffer);     
            });
        });
    }
}