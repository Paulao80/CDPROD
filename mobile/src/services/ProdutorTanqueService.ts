import Api from "./api";
import { ProdutoresTanques, ApiResponse, Delete } from "../Interfaces";

export async function list(): Promise<ApiResponse<ProdutoresTanques[]>> {
  const { data, status } = await Api.get<ProdutoresTanques[]>("/prodtanques");

  return {
    data,
    status,
  };
}

export async function listByTanqueId(
  id: number
): Promise<ApiResponse<ProdutoresTanques[]>> {
  const { data, status } = await Api.get<ProdutoresTanques[]>(
    `/prodtanques/tanque/${id}`
  );

  return {
    data,
    status,
  };
}

export async function getById(
  id: number
): Promise<ApiResponse<ProdutoresTanques>> {
  const { data, status } = await Api.get<ProdutoresTanques>(
    `/prodtanques/${id}`
  );

  return {
    data,
    status,
  };
}

export async function create(
  prodTanque: ProdutoresTanques
): Promise<ApiResponse<ProdutoresTanques>> {
  const { data, status } = await Api.post<ProdutoresTanques>(
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
