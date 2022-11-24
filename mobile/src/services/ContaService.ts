import Api from "./api";
import { ContaBancaria, Delete, ApiResponse } from "../interfaces";

export async function list(): Promise<ApiResponse<ContaBancaria[]>> {
  const { data, status } = await Api.get<ContaBancaria[]>(`/contas`);

  return {
    data,
    status,
  };
}

export async function listByProdutorId(
  id: number
): Promise<ApiResponse<ContaBancaria[]>> {
  const { data, status } = await Api.get<ContaBancaria[]>(
    `/contas/produtor/${id}`
  );

  return {
    data,
    status,
  };
}

export async function getById(id: number): Promise<ApiResponse<ContaBancaria>> {
  const { data, status } = await Api.get<ContaBancaria>(`/contas/${id}`);

  return {
    data,
    status,
  };
}

export async function create(
  conta: ContaBancaria
): Promise<ApiResponse<ContaBancaria>> {
  const { data, status } = await Api.post<ContaBancaria>(`/contas`, conta);

  return {
    data,
    status,
  };
}

export async function edit(
  conta: ContaBancaria
): Promise<ApiResponse<ContaBancaria>> {
  const { data, status } = await Api.put(`/contas`, conta);

  return {
    data,
    status,
  };
}

export async function del(id: number): Promise<ApiResponse<Delete>> {
  const { data, status } = await Api.delete<Delete>(`/contas/${id}`);

  return {
    data,
    status,
  };
}
