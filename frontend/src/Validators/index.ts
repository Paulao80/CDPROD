import { RuleObject } from "rc-field-form/lib/interface";

export const Nome: RuleObject[] = [
  {
    type: "string",
  },
  {
    required: true,
    message: "Nome é Obrigatório",
  },
];

export const DataNasc: RuleObject[] = [
  {
    type: "date",
  },
  {
    required: true,
    message: "Data de Nascimento é Obrigatório",
  },
];

export const TipoPessoa: RuleObject[] = [
  {
    type: "number",
  },
  {
    required: true,
    message: "Tipo de Pessoa é Obrigatório",
  },
];

export const Nacionalidade: RuleObject[] = [
  {
    type: "string",
  },
  {
    required: true,
    message: "Nacionalidade é Obrigatória",
  },
];

export const CpfCnpj: RuleObject[] = [
  {
    type: "string",
  },
  {
    required: true,
    message: "CPF/CNPJ é Obrigatório",
  },
];

export const RG: RuleObject[] = [
  {
    type: "string",
  },
  {
    required: true,
    message: "RG é Obrigatório",
  },
];

export const OrgaoExp: RuleObject[] = [
  {
    type: "string",
  },
  {
    required: true,
    message: "Orgão de Expedição é Obrigatório",
  },
];

export const EstadoExp: RuleObject[] = [
  {
    type: "string",
  },
  {
    required: true,
    message: "Estado de Expedição é Obrigatório",
  },
];

export const DataExp: RuleObject[] = [
  {
    type: "date",
  },
  {
    required: true,
    message: "Data de Expedição é Obrigatório",
  },
];

export const EstadoCivil: RuleObject[] = [
  {
    type: "number",
  },
  {
    required: true,
    message: "Estado Civil  é Obrigatório",
  },
];

export const Telefone: RuleObject[] = [
  {
    type: "string",
  },
  {
    required: false,
  },
];

export const UltLaticinio: RuleObject[] = [
    {
      type: "string",
    },
    {
      required: false,
    },
  ];
