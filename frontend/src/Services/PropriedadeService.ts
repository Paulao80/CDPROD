import { Propriedade, ApiResponse, Delete } from "../Interfaces";
import Api from "./Api";

export async function list(): Promise<ApiResponse<Propriedade[]>> {
  const { data, status } = await Api.get<Propriedade[]>(`/propriedades`);

  return {
    data,
    status,
  };
}

export async function getById(id: number): Promise<ApiResponse<Propriedade>> {
  const { data, status } = await Api.get<Propriedade>(`/propriedades/${id}`);

  return {
    data,
    status,
  };
}

export async function create(
  propriedade: Propriedade
): Promise<ApiResponse<Propriedade>> {
  const { data, status } = await Api.post<Propriedade>(`/propriedades`, propriedade);

  return {
    data,
    status,
  };
}

export async function edit(propriedade: Propriedade) {
  const { data, status } = await Api.put<Propriedade>(`/propriedades`, propriedade);

  return {
    data,
    status,
  };
}

export async function del(id: number): Promise<ApiResponse<Delete>> {
  const { data, status } = await Api.delete<Delete>(`/propriedades/${id}`);

  return {
    data,
    status,
  };
}
