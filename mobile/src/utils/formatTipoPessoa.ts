export function formatTipoPessoa(tipoPessoa?: number) {
  if (tipoPessoa === 1) return "Física";

  if (tipoPessoa === 2) return "Jurídica";

  return "-";
}
