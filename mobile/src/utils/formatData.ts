import moment from "moment";

export function formatDataToApi(data?: string) {
  const DataFormatada = data
    ? moment(data, "DD/MM/YYYY").format("YYYY-MM-DD")
    : undefined;

  return DataFormatada;
}

export function formatDataToApp(data?: string) {
  const DataFormatada = data
    ? moment(data, "YYYY-MM-DD").format("DD/MM/YYYY")
    : undefined;

  return DataFormatada;
}
