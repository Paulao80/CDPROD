import Api from "./Api";
import { Produtor, Delete, ApiResponse } from "../interfaces";

export async function list(): Promise<ApiResponse<Produtor[]>> {
  const { data, status } = await Api.get<Produtor[]>(`/produtores`);

  return {
    data,
    status,
  };
}

export async function getById(id: number): Promise<ApiResponse<Produtor>> {
  const { data, status } = await Api.get<Produtor>(`/produtores/${id}`);

  return {
    data,
    status,
  };
}

export async function create(
  produtor: Produtor
): Promise<ApiResponse<Produtor>> {
  const { data, status } = await Api.post<Produtor>(`/produtores`, produtor);

  return {
    data,
    status,
  };
}

export async function edit(produtor: Produtor): Promise<ApiResponse<Produtor>> {
  const { data, status } = await Api.put(`/produtores`, produtor);

  return {
    data,
    status,
  };
}

export async function del(id: number): Promise<ApiResponse<Delete>> {
  const { data, status } = await Api.delete<Delete>(`/produtores/${id}`);

  return {
    data,
    status,
  };
}
