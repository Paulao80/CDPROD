import Api from "./Api";
import { Produtor, Delete, ApiResponse } from "../Interfaces";

export async function list(): Promise<Produtor[]> {
  const { data } = await Api.get<Produtor[]>(`/produtores`);

  return data;
}

export async function getById(id: number): Promise<Produtor> {
  const { data } = await Api.get<Produtor>(`/produtores/${id}`);

  return data;
}

export async function create(produtor: Produtor): Promise<number> {
  const { status } = await Api.post(`/produtores`, produtor);

  return status;
}

export async function edit(produtor: Produtor): Promise<number> {
  const { status } = await Api.put(`/produtores`, produtor);

  return status;
}

export async function del(id: number): Promise<ApiResponse<Delete>> {
  const { data, status } = await Api.delete<Delete>(`/produtores/${id}`);

  return {
    data,
    status,
  };
}
