import Api from "./Api";
import { ProdutorTanque, Delete, ApiResponse } from "../Interfaces";

export async function list(): Promise<ApiResponse<ProdutorTanque[]>> {
  const { data, status } = await Api.get<ProdutorTanque[]>("/prodtanques");

  return {
    data,
    status,
  };
}

export async function listByTanqueId(
  id: number
): Promise<ApiResponse<ProdutorTanque[]>> {
  const { data, status } = await Api.get<ProdutorTanque[]>(
    `/prodtanques/tanque/${id}`
  );

  return {
    data,
    status,
  };
}

export async function getById(
  id: number
): Promise<ApiResponse<ProdutorTanque>> {
  const { data, status } = await Api.get<ProdutorTanque>(`/prodtanques/${id}`);

  return {
    data,
    status,
  };
}

export async function create(
  prodTanque: ProdutorTanque
): Promise<ApiResponse<ProdutorTanque>> {
  const { data, status } = await Api.post<ProdutorTanque>(
    "/prodtanques",
    prodTanque
  );

  return {
    data,
    status,
  };
}

export async function del(id: number): Promise<ApiResponse<Delete>> {
  const { data, status } = await Api.delete<Delete>(`/prodtanques/${id}`);

  return {
    data,
    status,
  };
}
