const estados = [
  {
    label: "solteiro(a)",
    value: 1,
  },
  {
    label: "casado(a)",
    value: 2,
  },
  {
    label: "separado(a)",
    value: 3,
  },
  {
    label: "divorciado(a)",
    value: 4,
  },
  {
    label: "viúvo(a)",
    value: 5,
  },
];

export function formatEstadoCivil(estadoCivil?: number) {
  switch (estadoCivil) {
    case 1:
      return "solteiro(a)";
    case 2:
      return "casado(a)";
    case 3:
      return "separado(a)";
    case 4:
      return "divorciado(a)";
    case 5:
      return "viúvo(a)";
    default:
      return "-";
  }
}
